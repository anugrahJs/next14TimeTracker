import { connectToDb } from "@/lib/connectToDb";
import { NextRequest, NextResponse } from "next/server";
import { Employee } from "@/lib/models";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    connectToDb();
    const { id, empData } = await req.json();
    // console.log(`id: ${id}, empData: ${empData}`);
    await Employee.findByIdAndUpdate(id, empData);
    return NextResponse.json(
      { message: "Employee data updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.log(
      "Error while updating employee data inside updateEmployeeData api route",
      err
    );
    throw new Error("Failed to update employee data");
  }
};
