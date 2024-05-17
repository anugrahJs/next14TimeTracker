import { connectToDb } from "@/utils/connectToDb";
import { Tasks } from "@/lib/models";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export const GET = async () => {
  const session = await auth();
  console.log("Current Session >>>>", session);
  //get tasks until monday
  const todayDate = new Date();
  todayDate.setHours(23, 59, 59, 999);
  let lastMondayDate = new Date(todayDate);
  //if today is Monday
  if (todayDate.getDay() === 1) {
    lastMondayDate.setHours(0, 0, 0, 0);
  } else {
    //logic to find the date of last Monday
    let daysUntilLastMonday;
    if (todayDate.getDay() === 0) {
      daysUntilLastMonday = 6;
    } else {
      daysUntilLastMonday = todayDate.getDay() - 1;
      lastMondayDate.setDate(todayDate.getDate() - daysUntilLastMonday);
      lastMondayDate.setHours(0, 0, 0, 0);
    }
  }
  try {
    connectToDb();
    const results = await Tasks.find({
      createdAt: { $gte: lastMondayDate, $lte: todayDate },
      user_id: session?.user?.id,
    });

    console.log("Task results", results);

    if (!results) {
      throw new Error("Data not found for this week");
    }

    const hoursSpentEachDay = results.map((result) =>
      result.subtasks.reduce((accumulator, subtask) => {
        const hours = subtask.hours;
        const minutesIntoHours = Number((subtask.minutes / 60).toFixed(2));
        const secondsIntoHours = Number((subtask.seconds / 3600).toFixed(2));
        const totalHours = hours + minutesIntoHours + secondsIntoHours;
        return accumulator + totalHours;
      }, 0)
    );

    console.log("hours spent each day", hoursSpentEachDay);
    return NextResponse.json(hoursSpentEachDay);
  } catch (err) {
    throw new Error("Failed to fetch data");
  }
};
