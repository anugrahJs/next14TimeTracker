"use client";

import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { NavLink } from "react-router-dom";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signOut } from "@/lib/auth";
import { handleLogout } from "@/lib/action";
import { RxDashboard } from "react-icons/rx";
import { IoMdTime } from "react-icons/io";
import { GrDocumentText } from "react-icons/gr";
import { MdOutlineScreenshot } from "react-icons/md";
import { BsPersonCircle } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { sessionUserType } from "@/lib/auth.config";
import { Session } from "next-auth";
import Image from "next/image";
import profilePicture from "../../public/profilePic.jpg";

type errorMessage = {
  message: string;
};

type userInfo = {
  fullName: string;
  department: string;
};

const Sidebar = ({ session }: { session: Session | null }) => {
  // const navigate = useNavigate();
  // const router=useRouter
  const router = useRouter();
  const [error, setError] = useState<errorMessage>();
  const [userDetails, setUserDetails] = useState<userInfo>({
    fullName: "",
    department: "",
  });

  const mySession = session as sessionUserType;

  function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message;
    return String(error);
  }

  //   function handleLogout() {
  //     localStorage.removeItem("token");
  //     router.push("/");
  //   }

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        // const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:3000/api/user");

        const resData = await res.json();
        console.log("User response >>>", resData);

        //to show error if sent by errorHandler middleware
        if (resData?.error) {
          setError({ message: resData.message });
        } else {
          setError(undefined);
          setUserDetails({
            fullName: resData.fullName,
            department: resData.department,
          });
        }
      } catch (err) {
        console.log(
          "catch block while fetching user details getting hit in api route"
        );
        setError({ message: getErrorMessage(err) });
      }
    }

    fetchUserDetails();
  }, []);

  return (
    <div className="h-screen bg-white">
      <div>
        <h1 className="px-4 py-10 text-3xl font-semibold text-time-tracker-gray font-roboto text-center">
          Time Tracker
        </h1>
        <div className="pl-8 py-4 text-sm text-gray-600 flex gap-4">
          {error && <h3>Error: User Not Available</h3>}
          <Image
            src={profilePicture}
            alt="Profile Pic"
            width={30}
            height={30}
            className="rounded-full"
          />
          <div>
            {userDetails && <h3>{userDetails.fullName}</h3>}
            {userDetails && (
              <h5 className="text-xs text-teal-600">
                {userDetails.department}
              </h5>
            )}
          </div>
        </div>
        <ul className=" text-gray-600 text-sm">
          <li className="pl-8 py-3 hover:bg-time-tracker-teal2 hover:text-white">
            {/* <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive ? "bg-time-tracker-teal2" : undefined
              }
              end
            >
              <div className="flex items-center gap-4">
                <RxDashboard style={{ fontSize: "1.5rem" }} />
                Dashboard
              </div>
            </NavLink> */}
            <Link href="/" className="flex items-center gap-4">
              <RxDashboard style={{ fontSize: "1.5rem" }} />
              Dashboard
            </Link>
          </li>
          <li className="pl-8 py-3 hover:bg-time-tracker-teal2 hover:text-white">
            <Link href="/timetracker">
              <div className="flex items-center gap-4">
                <IoMdTime style={{ fontSize: "1.5rem" }} />
                Time Tracker
              </div>
            </Link>
          </li>
          <li className="pl-8 py-3 hover:bg-time-tracker-teal2 hover:text-white">
            <Link href="/projects">
              <div className="flex items-center gap-4">
                <GrDocumentText style={{ fontSize: "1.5rem" }} />
                Projects
              </div>
            </Link>
          </li>
          <li className="pl-8 py-3 hover:bg-time-tracker-teal2 hover:text-white">
            <Link href="/screenshots">
              <div className="flex items-center gap-4">
                <MdOutlineScreenshot style={{ fontSize: "1.5rem" }} />
                Screenshots
              </div>
            </Link>
          </li>
          {mySession?.user.isAdmin && (
            <>
              <li className="pl-8 py-3 hover:bg-time-tracker-teal2 hover:text-white">
                <Link href="/clients">
                  <div className="flex items-center gap-4">
                    <BsPersonCircle style={{ fontSize: "1.5rem" }} />
                    Clients
                  </div>
                </Link>
              </li>
              <li className="pl-8 py-3 hover:bg-time-tracker-teal2 hover:text-white">
                <Link href="/employees">
                  <div className="flex items-center gap-4">
                    <HiOutlineUserGroup style={{ fontSize: "1.5rem" }} />
                    Employees
                  </div>
                </Link>
              </li>
            </>
          )}

          <li className="bg-time-tracker-teal2 py-3 text-white flex justify-center">
            <form action={handleLogout}>
              <button
              // onClick={async (e) => {
              //   console.log("Logout button getting clicked!!!");
              //   // await handleLogout();
              //   const response = await handleLogout();
              //   console.log("response: ", response);

              //   if (response) {
              //     router.push("/login");
              //   }
              // }}
              >
                Logout
              </button>
            </form>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
