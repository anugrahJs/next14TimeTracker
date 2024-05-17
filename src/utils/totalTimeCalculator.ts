import { subtask } from "./../store/tasks-slice";
import { task } from "../store/tasks-slice";

export function calculateHours(task: task) {
  const hours = task.subtasks.reduce((acc, subtask) => acc + subtask.hours, 0);
  return hours;
}

export function calculateMinutes(task: task) {
  const minutes = task.subtasks.reduce(
    (acc, subtask) => acc + subtask.minutes,
    0
  );
  return minutes;
}

export function calculateSeconds(task: task) {
  const seconds = task.subtasks.reduce(
    (acc, subtask) => acc + subtask.seconds,
    0
  );
  return seconds;
}

export function calculateTotalTime(task: task) {
  let hours = task.subtasks.reduce((acc, subtask) => acc + subtask.hours, 0);
  let minutes = task.subtasks.reduce(
    (acc, subtask) => acc + subtask.minutes,
    0
  );
  let seconds = task.subtasks.reduce(
    (acc, subtask) => acc + subtask.seconds,
    0
  );

  if (seconds > 59) {
    const extraMinutes = Math.round(seconds / 60);
    minutes += extraMinutes;
    seconds = seconds % 60;
  }

  if (minutes > 59) {
    const extraHours = Math.round(minutes / 60);
    hours += extraHours;
    minutes = minutes % 60;
  }

  return {
    hours,
    minutes,
    seconds,
  };
}
