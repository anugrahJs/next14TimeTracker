"use server";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { signIn, signOut } from "./auth";
import { isRedirectError } from "next/dist/client/components/redirect";

// import { redirect } from "next/dist/server/api-utils";
// import {redirect} from "next/router"

type formDataObject = {
  username: string;
  password: string;
  entries: any;
};

type stateType =
  | {
      error: string;
    }
  | undefined;

export const login = async (previousState: stateType, formData: FormData) => {
  "use server";
  const { username, password } = Object.fromEntries(formData.entries());

  console.log("login page");

  if (username === "" || password === "") {
    return { error: "All fields are mandatory" };
  }

  try {
    await signIn("credentials", { username, password });
    console.log("login function getting executed");
    // return { success: true };
  } catch (err: any) {
    console.log("err", err);
    if (err.message.includes("CredentialsSignin")) {
      return { error: "Invalid username or password" };
    }

    throw err;
  }
};

export const handleLogout = async () => {
  "use server";
  console.log("Handle logout getting triggered >>>>");
  await signOut();
  // try {

  //   await signOut({ redirect: false });
  //   return true;
  //   // console.log("res", res);
  // } catch (err) {
  //   console.log("myerr", err);
  //   return false;
  // }

  // signOut({ redirect: true, redirectTo: "/login" })
  //   .then((res) => console.log("DONE", res))
  //   .catch((err) => console.log("ERROR IN CATCH", err.message));
  // return { success: true };
};
