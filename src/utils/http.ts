import { RootState } from "./../store/store";
// import { getTasksFromBackend } from '@/utils/http';
import { projectsType } from "@/app/(protected)/projects/page";
import { task, subtask } from "@/store/tasks-slice";
import { employeeType } from "@/components/EmployeeAddEdit";
import { FieldValues } from "react-hook-form";
import { DELETE } from "@/app/api/deleteEmployee/route";

// export const getTasksFromBackend = async () => {
//   const token = localStorage.getItem("token");
//   const res = await fetch("http://localhost:5001/tasks", {
//     headers: {
//       Authorization: "Bearer " + token,
//     },
//   });

//   const resData = await res.json();
//   return resData;
// };]
export const getTasksFromBackend = async () => {
  console.log("getTasksFromBackend getting trigerred....");
  const response = await fetch("http://localhost:3000/api/tasks", {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return response.json();
};

export const addTask = async (newTask: task) => {
  // const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:3000/api/tasks/addNewTask", {
    method: "POST",
    body: JSON.stringify(newTask),
    headers: {
      "Content-Type": "application/json",
      // Authorization: "Bearer " + token,
    },
  });

  const resData = await res.json();
  return resData;
};

export const addSubtask = async (subtask: subtask, id: number) => {
  // const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:3000/api/tasks/addSubtask", {
    method: "POST",
    body: JSON.stringify({ subtask, id }),
    headers: {
      "Content-Type": "application/json",
      // Authorization: "Bearer " + token,
    },
  });

  const resData = await res.json();
  return resData;
};

export const deleteSubtask = async (id: number, subtask_id: number) => {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:3000/api/tasks/deleteSubtask", {
    method: "DELETE",
    body: JSON.stringify({ id, subtask_id }),
    headers: {
      "Content-Type": "application/json",
      // Authorization: "Bearer " + token,
    },
  });

  const resData = res.json();
  return resData;
};

export const getHoursSpentUntilMonday = async () => {
  const res = await fetch("http://localhost:3000/api/chart", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  const resData = await res.json();
  return resData;
};

export const addProject = async (formData: FieldValues) => {
  const res = await fetch("http://localhost:3000/api/addProject", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resData = await res.json();
  return resData;
};

export const getProjects = async () => {
  const res = await fetch("http://localhost:3000/api/getProjects");

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  const resData = await res.json();
  return resData;
};

export const deleteProject = async (id: string) => {
  const res = await fetch("http://localhost:3000/api/deleteProject", {
    method: "DELETE",
    body: JSON.stringify({ id }),
    headers: {
      "Content-type": "application/json",
    },
  });

  const resData = await res.json();
  return resData;
};

export const getSingleProjectData = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/getSingleProject/${id}`);
    const resData = await res.json();

    return resData;
  } catch (error) {
    console.log("Error occured while getting singleProjectData");
  }
};

export const updateProjectData = async (id: string, formData: FieldValues) => {
  const res = await fetch(`http://localhost:3000/api/updateProject`, {
    method: "POST",
    body: JSON.stringify({ id, formData }),
    headers: {
      "Content-type": "application/json",
    },
  });

  const resData = res.json();
  return resData;
};

// employee API's
export const addEmployeeData = async (formData: FieldValues) => {
  const res = await fetch("http://localhost:3000/api/addEmployee", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-type": "application/json",
    },
  });

  const resData = res.json();
  return resData;
};

export const getEmployees = async () => {
  const res = await fetch("http://localhost:3000/api/getEmployees");

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  const resData = await res.json();
  return resData;
};

export const deleteEmployee = async (id: string) => {
  const res = await fetch("http://localhost:3000/api/deleteEmployee", {
    method: "DELETE",
    body: JSON.stringify(id),
    headers: {
      "Content-type": "application/json",
    },
  });

  const resData = res.json();
  return resData;
};

export const getSingleEmployeeData = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/getSingleEmployee/${id}`);

  const resData = await res.json();
  return resData;
};

export const updateEmployeeData = async (id: string, empData: FieldValues) => {
  const res = await fetch("http://localhost:3000/api/updateEmployeeData", {
    method: "POST",
    body: JSON.stringify({ id, empData }),
    headers: {
      "Content-type": "application/json",
    },
  });

  const resData = await res.json();
  return resData;
};

//CLIENT API REQUESTS FUNCTIONS
export const addClient = async (clientData: FieldValues) => {
  const res = await fetch("http://localhost:3000/api/addClient", {
    method: "POST",
    body: JSON.stringify(clientData),
    headers: {
      "Content-type": "application/json",
    },
  });

  const resData = await res.json();
  return resData;
};

export const getClients = async () => {
  const res = await fetch("http://localhost:3000/api/getClients");

  const resData = await res.json();
  return resData;
};

export const deleteClient = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/deleteClient`, {
    method: "DELETE",
    body: JSON.stringify({ id }),
    headers: {
      "Content-type": "application/json",
    },
  });

  const resData = await res.json();
  return resData;
};

//for fetcing single client data
export const getSingleClientData = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/getSingleClient/${id}`);

  const resData = await res.json();
  return resData;
};

//updating client data
export const updateClientData = async (id: string, clientData: FieldValues) => {
  const res = await fetch(`http://localhost:3000/api/updateClientData`, {
    method: "POST",
    body: JSON.stringify({ id, clientData }),
    headers: {
      "Content-type": "application/json",
    },
  });

  const resData = await res.json();
  return resData;
};
