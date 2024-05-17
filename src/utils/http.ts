// import { getTasksFromBackend } from '@/utils/http';
import { task, subtask } from "@/store/tasks-slice";

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
