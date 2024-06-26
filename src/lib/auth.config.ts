import { NextRequest } from "next/server";
import { mySession } from "@/utils/types";
import { UserDocument } from "./models";
import { NextAuthConfig } from "next-auth";
import { Session, DefaultSession } from "next-auth";
import { User } from "next-auth";
import { connectToDb } from "./connectToDb";
import { User as dbUser } from "./models";

// import { NextApiResponse } from "next";

export type sessionUserType = {
  user: {
    name?: string;
    email?: string;
    image?: string;
    id?: string;
    isAdmin?: boolean;
  };
};

interface authUser extends User {
  isAdmin?: boolean;
}

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    async jwt({ token, user, profile }) {
      // const authUser = user as UserDocument;

      const authUser = user as authUser;
      if (authUser) {
        connectToDb();
        const loggedInUser = await dbUser.findOne({ email: user?.email });
        //explicitly adding userId by finding the user in the database as the correct id was not present when logging in with the social media providers
        if (loggedInUser) {
          token.id = loggedInUser?._id;
          token.isAdmin = authUser?.isAdmin;
        }
      }
      return token;
    },

    async session({ session, token }) {
      // const mySession = session as sessionUserType;
      console.log("Jun 26 Session: ", session);
      if (token) {
        (session.user as any).id = token.id as string;
        (session.user as any).isAdmin = token.isAdmin as boolean;
      }

      return session;
    },

    //this function includes our current user session and user request
    authorized({ auth, request }) {
      //return false hoga tabhi redirect karega upar jo pages me page mentioned ha us par
      const myAuth = auth as sessionUserType;
      const user = myAuth?.user;

      const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/admin");
      const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");
      const isOnHomePage = request.nextUrl?.pathname === "/";
      const isOnDashboardPage =
        request.nextUrl?.pathname.startsWith("/dashboard");
      const isOnProjectsPage =
        request.nextUrl?.pathname.startsWith("/projects");
      const isOnScreenshotsPage =
        request.nextUrl?.pathname.startsWith("/screenshots");
      const isOnTimeTrackerPage =
        request.nextUrl?.pathname.startsWith("/timetracker");
      const isOnClientsPage = request.nextUrl?.pathname.startsWith("/clients");
      const isOnEmployeesPage =
        request.nextUrl?.pathname.startsWith("/employees");

      //only admin can reach the admin panel
      if (isOnAdminPanel && !user?.isAdmin) {
        return false;
      }

      //only authenticated users can reach the homepage, dashboard, projects, screenshots, timetrackerpage, employees and clients page
      if (isOnHomePage && !user) {
        return false;
      }

      if (isOnProjectsPage && !user) {
        return false;
      }

      if (isOnScreenshotsPage && !user) {
        return false;
      }

      if (isOnTimeTrackerPage && !user) {
        return false;
      }

      if (isOnDashboardPage && !user) {
        return false;
      }

      if (isOnEmployeesPage && !user?.isAdmin) {
        return false;
      }

      if (isOnClientsPage && !user?.isAdmin) {
        return false;
      }

      //only unauthenticated users can reach the login page
      if (isOnLoginPage && user) {
        // console.log("TRIGGERED", user, isOnLoginPage, Response);
        return Response.redirect(new URL("/", request.nextUrl));
      }

      return true;
    },
  },
};
