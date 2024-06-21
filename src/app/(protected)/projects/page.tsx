import React from "react";
import Projects from "@/components/Projects";
import { auth } from "@/lib/auth";

const ProjectsPage = async () => {
  const session = await auth();
  return <Projects session={session} />;
};

export default ProjectsPage;
