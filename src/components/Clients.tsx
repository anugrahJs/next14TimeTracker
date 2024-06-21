"use client";
import Link from "next/link";
import { IoAddCircleOutline } from "react-icons/io5";
import React, { Dispatch, useState, useEffect, SetStateAction } from "react";
import { getProjects } from "@/utils/http";
import { projectsType } from "./Projects";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { getClients } from "@/utils/http";
import { SlOptionsVertical } from "react-icons/sl";
import { deleteClient } from "@/utils/http";
import { Session } from "next-auth";
import { sessionUserType } from "@/lib/auth.config";

export type clientType = {
  _id: string;
  clientName: string;
  contactNumber: string;
  email: string;
  clientCountry: {
    value: string;
    label: string;
  };
};

const Clients = ({ session }: { session: Session | null }) => {
  const [projects, setProjects] = useState<projectsType[]>([]);
  const [error, setError] = useState<{
    fetchingProjectsError: string;
    fetchingClientsError: string;
  }>({ fetchingProjectsError: "", fetchingClientsError: "" });
  const [selectedProject, setSelectedProject] = useState("myProject");
  const [clients, setClients] = useState<clientType[]>([]);
  const [isVisible, setIsVisible] = useState("");
  const [refetch, setRefetch] = useState(false);

  const mySession = session as sessionUserType;

  useEffect(() => {
    const fetchProjectsFromBackend = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.log(
          "Error while fetching projects in the frontend in clients page: ",
          err
        );
        setError((prevState) => ({
          ...prevState,
          fetchingProjectsError: getErrorMessage(err),
        }));
      }
    };
    fetchProjectsFromBackend();
    const fetchClientsFromBackend = async () => {
      try {
        const clients = await getClients();
        setClients(clients);
      } catch (err) {
        console.log(
          "Error while fetching clients in the frontend in clients page: ",
          err
        );
        setError((prevState) => ({
          ...prevState,
          fetchingClientsError: getErrorMessage(err),
        }));
      }
    };
    fetchClientsFromBackend();
  }, [refetch]);

  const handleSelectedProject = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProject(e.target.value);
  };

  return (
    <div className="px-8 py-10 text-gray-600">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-time-tracker-gray">
          Clients
        </h1>
        {mySession?.user.isAdmin && (
          <button className="bg-time-tracker-teal text-white px-3 py-2 flex items-center space-x-2">
            <IoAddCircleOutline className="text-xl" />
            <Link href="/admin/client/addClient">ADD NEW CLIENT</Link>
          </button>
        )}
      </div>
      <form className="bg-[#ffffff] p-2 my-10 flex justify-between">
        <select
          value={selectedProject}
          onChange={handleSelectedProject}
          className="bg-[#ffffff] pl-4"
        >
          <option value="myProject" disabled>
            Projects
          </option>
          {projects.map((project) => (
            <option key={project?._id}>{project?.projectName}</option>
          ))}
          setRefetch
          {/* <option value="suzzane">Suzzane</option>
          <option value="helena">Helena</option>
          <option value="emily">Emily</option>
          <option value="lauren">Lauren</option>
          <option value="sophie">Sophie</option> */}
        </select>
        <div className="space-x-3 basis-3/5 flex">
          <input
            type="text"
            placeholder="Search by client name"
            className="bg-[#f9f9f9] px-2 py-2 basis-11/12"
          />

          <button className="bg-time-tracker-teal text-white py-2 px-3 h-full">
            SEARCH
          </button>
        </div>
        {error?.fetchingProjectsError && (
          <p className="text-red-500">{error?.fetchingClientsError}</p>
        )}
      </form>
      <div className="text-sm border border-slate-300">
        <div className="flex bg-[#e9e9e9] px-5 py-3  text-gray-500">
          <h2 className="basis-2/12">Client</h2>
          <h2 className="basis-2/12">Contact</h2>
          <h2 className="basis-4/12">Email</h2>
          <h2>Country</h2>
        </div>
      </div>
      <div className="relative">
        {clients.map((client) => {
          return (
            <SingleClient
              client={client}
              isVisible={isVisible}
              setIsVisible={setIsVisible}
              setRefetch={setRefetch}
              refetch={refetch}
              key={client?._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Clients;

type singleClientProps = {
  client: clientType;
  isVisible: string;
  setIsVisible: Dispatch<SetStateAction<string>>;
  refetch: boolean;
  setRefetch: Dispatch<SetStateAction<boolean>>;
};

const SingleClient = ({
  client,
  isVisible,
  setIsVisible,
  refetch,
  setRefetch,
}: singleClientProps) => {
  const [deletionError, setDeletionError] = useState<{ message: string }>();

  const handleDelete = async (id: string) => {
    try {
      await deleteClient(id);
      setDeletionError({ message: "" });
      setRefetch(!refetch);
    } catch (err) {
      setDeletionError({ message: getErrorMessage(err) });
    }
  };

  return (
    <>
      <div className="flex px-5 py-4 bg-[#fff] border border-slate-300 border-t-0">
        <div className="basis-2/12 text-time-tracker-teal2 before:content-['\2022'] before:mr-2">
          {client?.clientName}
        </div>
        <div className="basis-2/12">{client?.contactNumber}</div>
        <div className="basis-4/12">{client?.email}</div>
        <div className="flex justify-between basis-4/12">
          <div className="flex space-x-2">{client?.clientCountry?.label}</div>
          <button
            className="relative"
            onClick={() => {
              if (isVisible === client?._id) {
                setIsVisible("");
              } else {
                setIsVisible(client?._id);
              }
            }}
          >
            <dialog
              open={isVisible === client?._id}
              className="absolute -top-3 -left-20 bg-slate-100 rounded-sm"
            >
              <ul>
                <li>
                  <div>
                    <Link href={`/admin/client/${client?._id}`}>Edit</Link>
                  </div>
                </li>
                <li>
                  <div onClick={() => handleDelete(client?._id)}>Delete</div>
                </li>
              </ul>
            </dialog>
            <SlOptionsVertical />
          </button>
          {deletionError && (
            <p className="text-red-500">{deletionError?.message}</p>
          )}
        </div>
      </div>
    </>
  );
};
