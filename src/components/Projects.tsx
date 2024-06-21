"use client";
import Link from "next/link";
import { IoAddCircleOutline } from "react-icons/io5";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getProjects } from "@/utils/http";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { SlOptionsVertical } from "react-icons/sl";
import { deleteProject } from "@/utils/http";
import { sessionUserType } from "@/lib/auth.config";
import { Session } from "next-auth";

type teamsType = {
  val: number;
  value: string;
  label: string;
};

export type projectsType = {
  clientName: string;
  hoursAlloted: string;
  hoursConsumed: string;
  hoursLeft: string;
  projectDesc: string;
  projectName: string;
  teams: teamsType[];
  technology: string;
  userId: string;
  _id: string;
};

const Projects = ({ session }: { session: Session | null }) => {
  const [error, setError] = useState<{ message: string }>();
  const [projects, setProjects] = useState<projectsType[]>([]);
  const [selectedClient, setSelectedClient] = useState("myClient");
  const [isVisible, setIsVisible] = useState("");
  const [refetch, setRefetch] = useState(false);

  const mySession = session as sessionUserType;

  useEffect(() => {
    const getProjectsFromBackend = async () => {
      try {
        let myProjects = await getProjects();
        setProjects(myProjects);
      } catch (err) {
        setError({ message: getErrorMessage(err) });
      }
    };
    getProjectsFromBackend();
  }, [refetch]);

  const handleSelectedClient = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClient(e.target.value);
  };

  return (
    <div className="px-8 py-10 text-gray-600">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-time-tracker-gray">
          Projects
        </h1>
        {mySession?.user.isAdmin && (
          <button className="bg-time-tracker-teal text-white px-3 py-2 flex items-center space-x-2">
            <IoAddCircleOutline className="text-xl" />
            <Link href="/admin/project/addProjects">ADD NEW PROJECT</Link>
          </button>
        )}
      </div>
      <form className="bg-[#ffffff] p-2 my-10 flex justify-between">
        <select
          value={selectedClient}
          onChange={handleSelectedClient}
          className="bg-[#ffffff] pl-4"
        >
          <option value="myClient" disabled>
            Client
          </option>
          <option value="suzzane">Suzzane</option>
          <option value="helena">Helena</option>
          <option value="emily">Emily</option>
          <option value="lauren">Lauren</option>
          <option value="sophie">Sophie</option>
        </select>
        <div className="space-x-3 basis-3/5 flex">
          <input
            type="text"
            placeholder="Search by project name"
            className="bg-[#f9f9f9] px-2 py-2 basis-11/12"
          />
          <button className="bg-time-tracker-teal text-white py-2 px-3 h-full">
            SEARCH
          </button>
        </div>
      </form>
      <div className="text-sm border border-slate-300">
        <div className="flex bg-[#e9e9e9] px-5 py-3  text-gray-500">
          <h2 className="basis-2/12">Project</h2>
          <h2 className="basis-2/12">Client</h2>
          <h2 className="basis-2/12">Hours</h2>
          <h2>Team</h2>
        </div>
      </div>
      <div className="relative">
        {projects.map((project) => {
          return (
            <SingleProject
              project={project}
              isVisible={isVisible}
              setIsVisible={setIsVisible}
              setRefetch={setRefetch}
              refetch={refetch}
              key={project?._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Projects;

type singleProjectProps = {
  project: projectsType;
  isVisible: string | null;
  setIsVisible: Dispatch<SetStateAction<string>>;
  refetch: boolean;
  setRefetch: Dispatch<SetStateAction<boolean>>;
};
const SingleProject = ({
  project,
  isVisible,
  setIsVisible,
  refetch,
  setRefetch,
}: singleProjectProps) => {
  const [error, setError] = useState<{ message: string }>();
  //handle deleting project
  const handleDelete = async (id: string) => {
    try {
      await deleteProject(id);
      setRefetch(!refetch);
    } catch (err) {
      setError({ message: getErrorMessage(err) });
    }
  };

  return (
    <>
      <div
        className="flex px-5 py-4 bg-[#fff] border border-slate-300 border-t-0"
        // key={project?.projectName}
      >
        <div className="basis-2/12 text-time-tracker-teal2 before:content-['\2022'] before:mr-2">
          {project?.projectName}
        </div>
        <div className="basis-2/12">{project?.clientName}</div>
        <div className="basis-2/12">{project?.hoursConsumed}</div>
        <div className="flex justify-between basis-6/12">
          <div className="flex space-x-2">
            {project?.teams?.map((team) => (
              <div key={team?.value}>{`${team?.label},`}</div>
            ))}
          </div>
          <button
            className="relative"
            onClick={() => {
              if (isVisible === project?._id) {
                setIsVisible("");
              } else {
                setIsVisible(project?._id);
              }
            }}
          >
            <dialog
              open={isVisible === project?._id}
              className="absolute -top-3 -left-20 bg-slate-100 rounded-sm"
            >
              <ul>
                <li>
                  <div>
                    <Link href={`/admin/project/${project?._id}`}>Edit</Link>
                  </div>
                </li>
                <li>
                  <div onClick={() => handleDelete(project?._id)}>Delete</div>
                </li>
              </ul>
            </dialog>
            <SlOptionsVertical />
          </button>
          {error && <p className="text-red-500">{error?.message}</p>}
        </div>
      </div>
    </>
  );
};
