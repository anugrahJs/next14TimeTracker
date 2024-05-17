"use client";

import { login } from "@/lib/action";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginForm = () => {
  // const initialState = {
  //   username: "",
  //   password: "",
  // };
  // const router = useRouter();

  const [state, formAction] = useFormState(login, undefined);

  console.log("first", state);

  // useEffect(() => {
  //   console.log("useEffect getting hit", state?.success);
  //   if (state?.success) {
  //     console.log("use state getting hit");
  //     router.push("/");
  //   }
  // }, [state?.success]);

  return (
    <div className="w-1/5 mx-auto mt-48">
      <h1 className="text-3xl font-bold text-time-tracker-gray text-center mb-6 font-roboto">
        Time Tracker
      </h1>
      <div className="py-9 px-8 bg-[#f8f9f8] rounded-xl shadow-xl">
        <h2 className="text-xl font-bold text-time-tracker-gray mb-4 font-roboto">
          Log in
        </h2>
        <form className="flex flex-col gap-5" action={formAction}>
          <input
            type="text"
            placeholder="username"
            className="bg-[#f2f2f2] p-2"
            name="username"

            // onChange={(event) => {
            //   inputChangeHandler(event.target.value, "email");
            // }}
            // value={input.email}
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-[#f2f2f2] p-2"
            name="password"

            // onChange={(event) => {
            //   inputChangeHandler(event.target.value, "password");
            // }}
            // value={input.password}
          />
          {/* {error && (
                  <p className="text-red-500 text-center">{error.message}</p>
                )} */}
          {state?.error && (
            <p className="text-center text-red-500">{state?.error}</p>
          )}
          <div className="flex justify-between my-3">
            <div className="flex gap-1">
              <input
                type="checkbox"
                id="stay-logged"
                className="form-checkbox checked:bg-teal-500"
              />
              <label htmlFor="stay-logged" className="text-sm">
                Stay logged in
              </label>
            </div>
            <a href="#" className="text-sm text-teal-600 underline">
              Forgot password
            </a>
          </div>
          <button
            type="submit"
            className="bg-time-tracker-teal text-white py-2 rounded-md text-sm"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
