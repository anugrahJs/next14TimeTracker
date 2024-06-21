import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "@/lib/connectToDb";
import { Client } from "@/lib/models";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    connectToDb();
    const projects = await Client.find();
    return NextResponse.json(projects, { status: 200 });
  } catch (err) {
    console.log(
      "Error while fetching clients inside API route getClients: ",
      err
    );
    throw new Error("Unable to get client data");
  }
};
