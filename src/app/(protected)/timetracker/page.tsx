"use client";

import { useEffect, useState } from "react";
import { useAppDisptach, useAppSelector } from "@/store/hooks";
import { tasksActions } from "@/store/tasks-slice";
import Tasks from "@/components/Tasks";
import { addTask, addSubtask, getTasksFromBackend } from "@/utils/http";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { subtask } from "@/store/tasks-slice";

let interval: ReturnType<typeof setInterval>;

const days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

const TimeTracker = () => {
  const dispatch = useAppDisptach();
  const tasks = useAppSelector((state) => state.tasks.tasks);

  const [time, setTime] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>();
  const [taskEntry, setTaskEntry] = useState({
    taskName: "",
    taskCategory: "Donna may Travel",
  });

  const [error, setError] = useState<{ message: string }>();

  const seconds = time % 60;
  const minutes = Math.floor(time / 60) % 60;
  const hours = Math.floor(time / 3600);

  //to fetch the initial tasks of the logged-in user
  useEffect(() => {
    async function getTasks() {
      try {
        const tasks = await getTasksFromBackend();
        console.log("tasks :>>", tasks);
        dispatch(tasksActions.setTasksFetchedFromBackend(tasks));
      } catch (err) {
        setError({ message: getErrorMessage(err) });
      }
    }
    getTasks();
  }, []);

  useEffect(() => {
    if (isStarted) {
      setStartTime(new Date());
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isStarted]);

  const handleInputChange = (identifier: string, value: string) => {
    setTaskEntry((prevTaskEntry) => ({
      ...prevTaskEntry,
      [identifier]: value,
    }));
  };

  const handleStartTimer = () => {
    setIsStarted(true);
  };

  const handleStopTimer = () => {
    setIsStarted(false);
    const endTime = new Date();
    let startingHours = startTime!.getHours();
    const startingMinutes = startTime!.getMinutes();
    // const startingSeconds = startTime!.getSeconds();
    let startTimeSuffix = "AM";

    let endingHours = endTime!.getHours();
    const endingMinutes = endTime!.getMinutes();
    // const endingSeconds = endTime!.getSeconds();
    let endTimeSuffix = "AM";

    const day = days[startTime!.getDay()];
    const month = months[startTime!.getMonth()];
    const taskDate = startTime!.getDate();
    const exactDate = `${day} ${month} ${taskDate}`;

    if (startingHours > 12) {
      startingHours -= 12;
      startTimeSuffix = "PM";
    }

    if (endingHours > 12) {
      endingHours -= 12;
      endTimeSuffix = "PM";
    }

    const startingTime = `${startingHours}:${
      startingMinutes < 10 ? "0" + startingMinutes : startingMinutes
    } ${startTimeSuffix}`;
    const endingTime = `${endingHours}:${
      endingMinutes < 10 ? "0" + endingMinutes : endingMinutes
    } ${endTimeSuffix}`;

    const subTask = {
      id: Math.random() * 1000,
      taskName: taskEntry.taskName,
      taskCategory: taskEntry.taskCategory,
      startingTime,
      endingTime,
      hours,
      minutes,
      seconds,
    };

    async function addNewSubtask() {
      try {
        const resData = await addSubtask(subTask, tasks[0].id);
        // console.log(subTask);
        // console.log("resData :>>", JSON.parse(resData));
        if (resData?.error) {
          setError({ message: resData.error });
        } else {
          setError(undefined);
          dispatch(tasksActions.updateEntry(subTask));
        }
      } catch (err) {
        console.log("addNewSubtask catch block hit....");
        console.log("Error message while adding new subtask>>>>", err);
        setError({ message: getErrorMessage(err) });
      }
    }

    const newTask = {
      id: Math.random() * 1000,
      subtasks: [subTask],
      date: exactDate,
    };
    //to add new task to the backend and to the redux store
    async function addNewTask() {
      try {
        setError(undefined);
        const res = await addTask(newTask);
        if (!res?.error) {
          setError(undefined);
          dispatch(tasksActions.addEntry(newTask));
        } else {
          console.log("add new task else block hit..");
          setError({ message: res?.error });
        }
        // if (resData.statusCode) {
        //   setError({ message: resData.message });
        // } else {
        //   setError(undefined);
        // }
      } catch (err) {
        console.log("addNewTask catch block getting hit...");
        setError({ message: getErrorMessage(err) });
        // dispatch(tasksActions.removeEntry());
      }
    }

    const totalTime = `${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }:${seconds < 10 ? "0" + seconds : seconds}`;
    console.log(`${startingTime} ${endingTime} ${totalTime}`);

    console.log("Current tasks: ", tasks);

    if (tasks[0] && tasks[0]?.date === exactDate) {
      console.log("Add new subtask api getting hit");
      addNewSubtask();
    } else {
      console.log("Add new task api getting hit");
      addNewTask();
    }

    // dispatch(tasksActions.addTask(task));
    setTime(0);
    setTaskEntry({ taskName: "", taskCategory: "Donna may Travel" });
  };

  const handleResume = (subtask: subtask) => {
    setTaskEntry({
      taskName: subtask.taskName,
      taskCategory: subtask.taskCategory,
    });
    handleStartTimer();
  };

  return (
    <div className="py-10 pl-8 pr-10 ">
      <form className=" bg-white p-2 border border-gray-200 flex justify-between">
        <div className="basis-3/5">
          <input
            className="bg-[#f9f8f8] w-full h-10"
            type="text"
            onChange={(event) =>
              handleInputChange("taskName", event.target.value)
            }
            value={taskEntry.taskName}
          />
        </div>
        <div className="flex gap-x-4 items-center ">
          <label htmlFor="projects">Projects</label>
          <select
            name="projects"
            id="projects"
            onChange={(event) =>
              handleInputChange("taskCategory", event.target.value)
            }
            value={taskEntry.taskCategory}
          >
            <option value="Donna may travel">Donna may travel</option>
            <option value="Ebay mockup">Ebay mockup</option>
            <option value="IT consilium">IT consilium</option>
            <option value="Learning Time">Learning Time</option>
            <option value="Mazeix">Mazeix</option>
          </select>
          <p className="font-medium text-lg">
            {hours < 10 ? "0" + hours : hours}:
            {minutes < 10 ? "0" + minutes : minutes}:
            {seconds < 10 ? "0" + seconds : seconds}
          </p>
          <button
            type="button"
            onClick={isStarted ? handleStopTimer : handleStartTimer}
            className="bg-[#07a7b3] text-white px-4 py-2 text-sm"
          >
            {isStarted ? "STOP" : "START"}
          </button>
        </div>
      </form>
      {error && <p className="text-red-500">{error.message}</p>}
      <Tasks handleResume={handleResume} />
    </div>
  );
};
export default TimeTracker;
