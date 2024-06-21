import { connectToDb } from "@/lib/connectToDb";
import { NextRequest, NextResponse } from "next/server";
import { Client } from "@/lib/models";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    connectToDb();
    const clientData = await req.json();
    await Client.create(clientData);
    return NextResponse.json(
      { message: "Client added successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.log(
      "Error occured while adding new client inside addClient api route: ",
      err
    );
    throw new Error("Failed to add new client");
  }
};
