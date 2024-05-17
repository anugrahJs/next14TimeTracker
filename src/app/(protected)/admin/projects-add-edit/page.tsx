"use client";
import React from "react";
import Select from "react-select";
import { useState } from "react";

const ProjectsAddEditPage = () => {
  const [selected, setSelected] = useState([]);

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  return (
    <div>
      <h1>Add Edit Project</h1>
      <form>
        <input type="text" placeholder="Project Name" name="projectName" />
        <select>
          <option>Client</option>
          <option>Helena</option>
          <option>Emily</option>
          <option>Lauren</option>
          <option>Sophie</option>
        </select>
        <input type="text" placeholder="Technology" name="technology" />
        <input type="text" placeholder="Hours Alloted" name="hoursAlloted" />
        <input type="text" placeholder="Hours Consumed" name="hoursConsumed" />
        <input type="text" placeholder="Hours Left" name="hoursLeft" />
        <textarea placeholder="description" rows={10} />
        <Select options={options} isMulti />
      </form>
    </div>
  );
};

export default ProjectsAddEditPage;
