import { connectToDb } from "@/lib/connectToDb";
import { NextResponse, NextRequest } from "next/server";
import { Projects } from "@/lib/models";

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  try {
    connectToDb();
    const { id } = await req.json();
    await Projects.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Project Deleted Successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.log("Error while deleting Project: ", err);
    throw new Error("Failed to delete project");
  }
};
