import { connectToDb } from "@/lib/connectToDb";
import { NextRequest, NextResponse } from "next/server";
import { Client } from "@/lib/models";
import { FieldValues } from "react-hook-form";

type paramsType = {
  id: string;
  clientData: FieldValues;
};
export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    connectToDb();
    const { id, clientData } = await req.json();
    await Client.findByIdAndUpdate(id, clientData);
    return NextResponse.json(
      { message: "Client data updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.log("Error while updating client data: ", err);
    throw new Error("Failed to update client data");
  }
};
