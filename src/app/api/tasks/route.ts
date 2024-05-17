import { connectToDb } from "@/lib/connectToDb";
import { Tasks } from "@/lib/models";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { Session } from "next-auth";
import { mySession } from "@/utils/types";

export const GET = async () => {
  // console.log("req inside getTriggered :>>", req.headers);
  const session: Session = await auth();
  console.log("Session >>>>", session);

  try {
    connectToDb();
    const tasks = await Tasks.find({
      user_id: session?.user?.id,
    }).sort({ createdAt: -1 });
    return NextResponse.json(tasks);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch tasks");
  }
};
