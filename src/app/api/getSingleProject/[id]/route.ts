import { connectToDb } from "@/lib/connectToDb";
import { NextApiRequest, NextApiResponse } from "next";
import { Projects } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";

// export const GET = async (
// {params}
// ):{params:{id:string}} => {
//   console.log("params", params);
//   // try {
//   //   connectToDb();
//   //   // const id = req.;
//   //   const project = await Projects.findById(id);
//   //   return NextResponse.json(project, { status: 200 });
//   // } catch (err) {
//   //   console.log("Error while fetching single project: ", err);
//   //   throw new Error("Unable to find project with the given id");
//   // }
// };

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  console.log("params?.id", params?.id);
  try {
    connectToDb();
    const project = await Projects.findOne({ _id: params?.id });
    return NextResponse.json(project, { status: 200 });
  } catch (err) {
    console.log("Unable to find a project: ", err);
    throw new Error("Unable to find a project");
  }
};
