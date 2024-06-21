import { connectToDb } from "@/lib/connectToDb";
import { NextRequest, NextResponse } from "next/server";
import { Employee } from "@/lib/models";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    connectToDb();
    const employees = await Employee.find();
    return NextResponse.json(employees, { status: 200 });
  } catch (err) {
    console.log("Error while fetching employees data: ", err);
    throw new Error("Unable to fetch employees");
  }
};
