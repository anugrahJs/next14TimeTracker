// import { useRouter } from "next/navigation";
import NextAuth from "next-auth";
// import { CredentialsProvider } from "next-auth/providers/credentials";
import Credentials from "next-auth/providers/credentials";
import google from "next-auth/providers/google";
import { connectToDb } from "./connectToDb";
import { User } from "./models";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

type credentialsType = {
  username: string;
  password: string;
};

const login = async (credentials: credentialsType) => {
  try {
    connectToDb();

    console.log("connected");
    const user = await User.findOne({ username: credentials.username });

    if (!user) {
      throw new Error("Wrong credentials");
    }

    const passwordMatched = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!passwordMatched) {
      throw new Error("Wrong password, please try again");
    }

    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to login");
  }
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,

  providers: [
    google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
    Credentials({
      // name: "credentials",
      // id: "credentials",

      //writing the rules using the authorize function

      async authorize(credentials: credentialsType) {
        console.log("inside auth");
        try {
          const user = await login(credentials);
          console.log("User: ", user);
          return user;
        } catch (err) {
          console.log(err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        connectToDb();
        try {
          const user = await User.findOne({ email: profile!?.email });

          if (!user) {
            const newUser = new User({
              username: profile?.given_name,
              fullName: profile?.name,
              department: "Not Assigned",
              email: profile?.email,
              img: profile?.picture,
            });

            await newUser.save();
          }
        } catch (err) {
          console.log("Error occured while loggin with google: ", err);
          return false;
        }
      }
      return true;
    },
    ...authConfig.callbacks,
  },
});
