import { connectToDb } from "@/lib/connectToDb";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/lib/models";
import bcrypt from "bcryptjs";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const user = await req.json();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user?.password, salt);
    const newUser = new User({
      ...user,
      password: hashedPassword,
    });
    await newUser.save();

    return NextResponse.json(
      { message: "User added successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.log("error while adding new user in API route /addUser: ", err);
    throw new Error("Failed to add new user");
  }
};
