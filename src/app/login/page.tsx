// "use client";
import Image from "next/image";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { login } from "@/lib/action";
import LoginForm from "@/components/LoginForm";
// import { nextAuth } from "@/lib/auth";

type errorMessage = {
  message: string;
};

export default function LoginPage() {
  return (
    <LoginForm />
    // const router = useRouter();

    // const [input, setInput] = useState({
    //   email: "",
    //   password: "",
    // });

    // const [error, setError] = useState<errorMessage>();

    // const handleSubmit = (event: React.FormEvent) => {
    //   event.preventDefault();

    //clearing input fields after the form is submitted
    // setInput((prevState) => ({ ...prevState, email: "", password: "" }));

    //   const loginUser = async () => {
    //     try {
    //       const response = await fetch("http://localhost:5001/login", {
    //         method: "POST",
    //         body: JSON.stringify({
    //           email: input.email,
    //           password: input.password,
    //         }),
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         credentials: "include",
    //       });

    //       //to set error if sent by error handler middleware
    //       const resData = await response.json();
    //       if (resData.statusCode) {
    //         setError({ message: resData.message });
    //       } else {
    //         setError(undefined);
    //       }

    //       if (resData.status) {
    //         localStorage.setItem("token", resData.token);
    //         router.push("/dashboard");
    //       }
    //     } catch (err) {
    //       setError({ message: getErrorMessage(err) });
    //     }
    //   };

    //   loginUser();
    // };

    // const inputChangeHandler = (value: string, identifier: string) => {
    //   setInput((prevState) => ({
    //     ...prevState,
    //     [identifier]: value,
    //   }));
    // };

    // console.log(nextAuth.login);
  );
}
