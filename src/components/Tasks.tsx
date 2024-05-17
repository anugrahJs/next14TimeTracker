import { useState } from "react";
import { useAppSelector, useAppDisptach } from "../store/hooks";
import { tasksActions } from "../store/tasks-slice";
import { deleteSubtask } from "@/utils/http";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { CiPlay1 } from "react-icons/ci";
import { FaRegTrashCan } from "react-icons/fa6";
import { subtask } from "../store/tasks-slice";
import { calculateTotalTime } from "@/utils/totalTimeCalculator";

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String(error);
};

type tasksProps = {
  handleResume: (subtask: subtask) => void;
};

const Tasks = ({ handleResume }: tasksProps) => {
  const [error, setError] = useState<{ message: string }>();
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const dispatch = useAppDisptach();

  const handleDelete = async (
    id: number,
    subtask_id: number,
    index: number,
    subtaskIndex: number
  ) => {
    try {
      const resData = await deleteSubtask(id, subtask_id);
      if (resData?.error) {
        setError({ message: resData.message });
      } else {
        setError(undefined);
        dispatch(tasksActions.deleteEntry({ index, subtaskIndex }));
      }
    } catch (err) {
      console.log("error in catch block while deleting task>>>>", err);
      setError({ message: getErrorMessage(error) });
    }
  };

  return (
    <>
      {error && <p>{error.message}</p>}
      {tasks.map((task, index) => (
        <div key={task.id} className="border border-gray-200 mt-5">
          <div className="flex justify-between items-center px-5 py-2 bg-[#e8e8e9] text-[#7d7d7c] text-sm">
            <div>{task.date}</div>
            <div>
              Total:
              <span className="text-xl font-bold text-[#4f4f4f]">
                {` ${
                  calculateTotalTime(task)?.hours < 9
                    ? "0" + calculateTotalTime(task)?.hours
                    : calculateTotalTime(task)?.hours
                }`}
                :
                {calculateTotalTime(task)?.minutes < 9
                  ? "0" + calculateTotalTime(task)?.minutes
                  : calculateTotalTime(task)?.minutes}
                :
                {calculateTotalTime(task)?.seconds < 9
                  ? "0" + calculateTotalTime(task)?.seconds
                  : calculateTotalTime(task)?.seconds}
              </span>
            </div>
          </div>
          {task.subtasks.map((subtask, subtaskIndex) => (
            <div
              key={subtask.id}
              className="flex items-center bg-white px-5 py-3 border-t border-t-gray-200 text-[#686868] text-sm"
            >
              <div className="basis-2/12">{subtask.taskName}</div>
              <div className="basis-6/12 text-[#30b2bf]">
                <li>{subtask.taskCategory}</li>
              </div>
              <div className="flex justify-between items-center basis-4/12">
                <div className="basis-36">
                  {subtask.startingTime} - {subtask.endingTime}
                </div>
                {/* <div className="basis-2/12">{subtask.endingTime}</div> */}
                <MdOutlineCalendarMonth size={25} />
                <div className="border border-l-gray-100 h-8"></div>
                <div className="text-xl font-bold text-[#4f4f4f]">{`${
                  subtask.hours < 9 ? "0" + subtask.hours : subtask.hours
                }:${
                  subtask.minutes < 9 ? "0" + subtask.minutes : subtask.minutes
                }:${
                  subtask.seconds < 9 ? "0" + subtask.seconds : subtask.seconds
                }`}</div>
                <div className="border border-l-gray-100 h-8"></div>

                <button
                  onClick={() => {
                    handleResume(subtask);
                  }}
                >
                  <CiPlay1 size={20} />
                </button>

                <div className="border border-l-gray-100 h-8"></div>

                <button
                  onClick={() => {
                    handleDelete(task.id, subtask.id, index, subtaskIndex);
                  }}
                >
                  <FaRegTrashCan size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default Tasks;
