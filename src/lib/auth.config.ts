import { UserDocument } from "./models";
import { NextAuthConfig } from "next-auth";
// import { NextApiResponse } from "next";

type sessionUserType = {
  name?: string;
  email?: string;
  image?: string;
  id?: string;
  isAdmin?: boolean;
};

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      const authUser = user as UserDocument;
      if (authUser) {
        token.id = authUser.id;
        token.isAdmin = authUser.isAdmin;
      }
      return token;
    },

    async session({ session, token }) {
      const sessionUser = session.user as sessionUserType;

      if (token) {
        sessionUser.id = token.id as string;
        sessionUser.isAdmin = token.isAdmin as boolean;
      }
      return session;
    },

    authorized({ auth, request }) {
      //return false hoga tabhi redirect karega upar jo pages me page mentioned ha us par
      const user = auth?.user;

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

      //only authenticated users can reach the homepage, dashboard, projects, screenshots, timetrackerpage
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

      //only unauthenticated users can reach the login page
      if (isOnLoginPage && user) {
        // console.log("TRIGGERED", user, isOnLoginPage, Response);
        return Response.redirect(new URL("/", request.nextUrl));
      }

      return true;
    },
  },
};
