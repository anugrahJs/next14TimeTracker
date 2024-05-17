// import { useRouter } from "next/navigation";
import NextAuth from "next-auth";
// import { CredentialsProvider } from "next-auth/providers/credentials";
import Credentials from "next-auth/providers/credentials";
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
    ...authConfig.callbacks,
  },
});
