import { connectToDb } from "@/lib/connectToDb";
import { NextRequest, NextResponse } from "next/server";
import { Client } from "@/lib/models";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } },
  res: NextResponse
) => {
  try {
    connectToDb();
    const client = await Client.findById(params?.id);
    return NextResponse.json(client, { status: 200 });
  } catch (err) {
    console.log(
      "Error while fetching individual client data inside getSingleClient api route: ",
      err
    );
    throw new Error("Fetching client data failed");
  }
};
