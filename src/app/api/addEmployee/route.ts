import { Employee } from "./../../../lib/models";
import { connectToDb } from "@/lib/connectToDb";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    connectToDb();
    const employeeData = await req.json();
    await Employee.create(employeeData);

    return NextResponse.json(
      { message: "Employee added successfully" },
      { status: 200 }
    );
  } catch (err) {
    throw new Error("Failed to add new employee");
  }
};
