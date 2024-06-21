import { connectToDb } from "@/lib/connectToDb";
import { Projects } from "@/lib/models";
import { projectsType } from "@/app/(protected)/projects/page";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

type propTypes = {
  id: string;
  formData: projectsType;
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  const session = await auth();
  console.log("current user session", session?.user);
  try {
    connectToDb();
    const { id, formData }: propTypes = await req.json();
    const formDataWithUserId = { ...formData, userId: session?.user?.id };

    await Projects.findByIdAndUpdate(id, formDataWithUserId);
    return NextResponse.json(
      { message: "Project data updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    throw new Error("Unable to update project data");
  }
};
