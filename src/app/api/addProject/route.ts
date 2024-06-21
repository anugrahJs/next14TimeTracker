import { connectToDb } from "@/lib/connectToDb";
// import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { Projects } from "@/lib/models";
import { auth } from "@/lib/auth";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    connectToDb();
    const data = await req.json();
    const session = await auth();
    const projectData = { ...data, userId: session?.user?.id };

    await Projects.create(projectData);

    return NextResponse.json(
      { message: "Project added successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    throw new Error("Failed to add project");
  }
};
