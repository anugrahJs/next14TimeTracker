"use client";
import ProjectsAddEdit from "@/components/ProjectsAddEdit";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getSingleProjectData } from "@/utils/http";
import { projectsType } from "../../../projects/page";

const EditProjectsPage = () => {
  const { editProjects } = useParams();

  const [project, setProjects] = useState<projectsType | null>(null);
  useEffect(() => {
    async function call() {
      try {
        const project = await getSingleProjectData(editProjects as string);
        setProjects(project);
      } catch (err) {
        console.log("Error while fetching a single project>>>>", err);
      }
    }
    call();
  }, []);

  console.log("projects", project);
  return <>{project && <ProjectsAddEdit project={project} />}</>;
};

export default EditProjectsPage;
