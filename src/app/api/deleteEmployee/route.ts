import { connectToDb } from "@/lib/connectToDb";
import { NextRequest, NextResponse } from "next/server";
import { Employee } from "@/lib/models";

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  try {
    connectToDb();
    const id = await req.json();
    await Employee.findByIdAndDelete(id);
    return NextResponse.json(
      {
        message: "Employee deleted successfully",
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(
      "Error while deleting employee inside API route /deleteEmployee: ",
      err
    );
    throw new Error("Failed to delete employee");
  }
};
