"use client";

import { BarElement, CategoryScale, Chart, LinearScale } from "chart.js";
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(BarElement);
import { Bar } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { getHoursSpentUntilMonday } from "@/utils/http";
import { getErrorMessage } from "@/utils/getErrorMessage";
let labels: String[] = [];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Dashboard = () => {
  const [error, setError] = useState<{ message: string }>();
  const [userData, setUserData] = useState({
    //labels represents a list of labels that represent each of the bar
    labels,
    datasets: [
      {
        label: "Hours",
        data: [],
        backgroundColor: ["#08a7b3"],
      },
    ],
  });

  useEffect(() => {
    const getHours = async () => {
      try {
        const res = await getHoursSpentUntilMonday();
        //logic to create labels array
        labels = ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"];
        // const index: number = res.length() - 1;
        // const date = new Date();
        // for (let i = index; i >= 0; i--) {}

        if (res.statusCode) {
          setError({ message: res.message });
        } else {
          setError(undefined);
          let daysUntilLastMonday: number;
          const todaydate = new Date();
          if (todaydate.getDay() === 0) {
            daysUntilLastMonday = 6;
          } else {
            daysUntilLastMonday = todaydate.getDay() - 1;
          }
          let dateOnLastMonday = new Date();
          dateOnLastMonday.setDate(todaydate.getDate() - daysUntilLastMonday);

          const arrayOfDateObjects: Date[] = [];

          for (let i = 0; i < 7; i++) {
            const newDate = new Date(dateOnLastMonday);
            newDate.setDate(dateOnLastMonday.getDate() + i);
            arrayOfDateObjects.push(newDate);
            labels[i] =
              labels[i] +
              `, ${arrayOfDateObjects[i].getDate()} ${
                months[arrayOfDateObjects[i].getMonth()]
              }`;
          }

          console.log(arrayOfDateObjects);

          setUserData({
            labels,
            datasets: [
              { label: "Hours", data: res, backgroundColor: ["#08a7b3"] },
            ],
          });
        }
      } catch (err) {
        setError({ message: getErrorMessage(err) });
      }
    };
    getHours();
  }, []);

  const options = {
    scales: {
      y: {
        suggestedMin: 0,
        suggestedMax: 9,
      },
    },
  };

  return (
    <div className="p-20">
      {error && <p>{error.message}</p>}
      <div className="border border-gray-200">
        <Bar data={userData} options={options} />
      </div>
    </div>
  );
};

export default Dashboard;
