import { connectToDb } from "@/lib/connectToDb";
import { NextRequest, NextResponse } from "next/server";
import { Projects } from "@/lib/models";

export const GET = async () => {
  try {
    connectToDb();
    const projects = await Projects.find();
    return NextResponse.json(projects, { status: 200 });
  } catch (err) {
    console.log("Error while fetching projects data>>>>", err);
    throw new Error("Unable to fetch projects");
  }
};
