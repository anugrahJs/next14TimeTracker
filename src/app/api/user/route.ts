import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "@/lib/connectToDb";
import { User } from "@/lib/models";
import { auth } from "@/lib/auth";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const session = await auth();
  console.log("Session while fetching user >>> ", session);
  try {
    connectToDb();
    const user = await User.findOne({ email: session?.user?.email });
    console.log("Our user is >>>", user);
    if (!user) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(user);
  } catch (err) {
    console.log(
      "Error in catch block while fetching user in api route>>>>",
      err
    );
    throw new Error("Unable to fetch user");
  }
};
