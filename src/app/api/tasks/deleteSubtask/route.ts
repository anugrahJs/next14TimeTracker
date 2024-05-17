import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "@/lib/connectToDb";
import { Tasks } from "@/lib/models";
import { auth } from "@/lib/auth";

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  const session = await auth();
  try {
    connectToDb();
    const { id, subtask_id } = await req.json();
    const task = await Tasks.find({ id });

    if (!task) {
      return NextResponse.json({ error: "task not found" }, { status: 404 });
      //   res.status(404);
      //   throw new Error("task not found");
    }

    if (task[0].user_id.toString() !== session?.user?.id) {
      return NextResponse.json(
        {
          error: "User don't have permission to delete other user's data",
        },
        { status: 403 }
      );
      //   res.status(403);
      //   throw new Error("User don't have permission to delete other user's data");
    }

    if (task[0]?.subtasks.length === 1) {
      console.log("deleteOne hit...");
      await Tasks.deleteOne({ id });
    } else {
      await Tasks.updateOne(
        { id },
        { $pull: { subtasks: { id: subtask_id } } }
      );
    }

    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 200 }
    );
    // res.status(200).json("Task deleted successfully");
  } catch (err) {
    console.log(
      "error in catch block in api route while deleting subtask>>>",
      err
    );
    throw new Error("Something went wrong");
  }
};
