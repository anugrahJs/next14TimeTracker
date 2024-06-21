import { connectToDb } from "@/lib/connectToDb";
import { NextRequest, NextResponse } from "next/server";
import { Employee } from "@/lib/models";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } },
  res: NextResponse
) => {
  try {
    connectToDb();
    const employeeData = await Employee.findById(params?.id);
    return NextResponse.json(employeeData, { status: 200 });
  } catch (err) {
    console.log(
      "Error while fetching individual employee data inside API route: ",
      err
    );
    throw new Error("Unable to fetch single employee data");
  }
};
