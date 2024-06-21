import { connectToDb } from "@/lib/connectToDb";
import { NextRequest, NextResponse } from "next/server";
import { Client } from "@/lib/models";

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  try {
    connectToDb();
    const { id } = await req.json();
    await Client.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Client deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.log(
      "Error while deleting client data inside API route /deleteClient: ",
      err
    );

    throw new Error("Deleting client data failed");
  }
};
