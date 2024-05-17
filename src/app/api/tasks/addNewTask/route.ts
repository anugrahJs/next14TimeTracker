import { connectToDb } from "@/lib/connectToDb";
import { Tasks } from "@/lib/models";
import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextApiResponse) => {
  const session = await auth();
  try {
    connectToDb();
    const { id, subtasks, date } = await req.json();

    if (!id || !subtasks || !date) {
      return NextResponse.json(
        {
          error: "All fields are mandatory",
        },
        { status: 401 }
      );
      //   res.status(400);
      //   throw new Error("All fields are mandatory");
    }

    const taskWithUserId = { id, subtasks, date, user_id: session?.user?.id };

    await Tasks.create(taskWithUserId);
    return NextResponse.json(
      { message: "Task added successfully" },
      { status: 201 }
    );
    // res.status(201).json({ message: "Task added successfully" });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Failed to add new task" });
    // throw new Error("Failed to add new task");
  }
};
