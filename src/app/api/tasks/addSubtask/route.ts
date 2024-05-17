import { connectToDb } from "@/lib/connectToDb";
import { Tasks } from "@/lib/models";
import { NextApiRequest, NextApiResponse } from "next";
import { mySession } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextApiResponse) => {
  try {
    connectToDb();
    const { subtask, id } = await req.json();

    if (!subtask || !id) {
      console.log("subtask or id missing");
      return NextResponse.json(
        { error: "All fields are mandatory" },
        { status: 400 }
      );
      // res.status(400);
      // throw new Error("All fields are mandatory");
    }

    await Tasks.updateOne(
      { id },
      {
        $push: {
          subtasks: {
            $each: [subtask],
            $position: 0,
          },
        },
      }
    );

    return NextResponse.json(
      { message: "Subtask added successfully" },
      { status: 200 }
    );
    // res.status(200).json({ message: "Subtask added successfully" });
  } catch (err) {
    console.log("Catch block of addSubtask api route getting hit");
    console.log(err);
    throw new Error("Failed to add subtask");
  }
};
