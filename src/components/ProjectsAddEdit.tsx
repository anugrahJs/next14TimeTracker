"use client";
import React from "react";
import Select, { MultiValue, ActionMeta } from "react-select";
import { useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import Input from "@/components/Input";
import { useEffect } from "react";
import ReactSelect from "@/components/ReactSelect";
import { addProject, updateProjectData } from "@/utils/http";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { projectsType } from "@/app/(protected)/projects/page";
import { IoMdClose } from "react-icons/io";

type optionsType = {
  val: number;
  value: string;
  label: string;
};

const options: optionsType[] = [
  { val: 1, value: "design", label: "Design" },
  { val: 2, value: "developer", label: "Developer" },
  { val: 3, value: "android", label: "Android" },
  { val: 4, value: "qa", label: "QA" },
  { val: 5, value: "projectManager", label: "Project Manager" },
];

const clientOptions: optionsType[] = [
  { val: 1, value: "Helena", label: "Helena" },
  { val: 2, value: "Emily", label: "Emily" },
  { val: 3, value: "Lauren", label: "Lauren" },
  { val: 4, value: "Sophie", label: "Sophie" },
];

const clients = ["Helena", "Emily", "Lauren", "Sophie"];

const ProjectsAddEdit = ({ project }: { project?: projectsType | null }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState<{ message: string }>();
  // const [selected, setSelected] = useState<MultiValue<optionsType>>(
  //   watch("designPattern") || []
  // );

  const {
    watch,
    control,
    trigger,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  //to set the field values if the user is editing existing project
  let selected: optionsType[] | [] = watch("teams") || [];

  // if (project) {
  //   selected = project.teams;
  //   setValue("teams", selected);
  // } else {
  //   selected = watch("teams") || [];
  // }

  useEffect(() => {
    setIsMounted(true);
    if (project) {
      selected = project!.teams;
      setValue("teams", selected);
      setValue("clientName", project?.clientName);
    }
  }, []);

  const handleChange = (
    values: MultiValue<optionsType>,
    actionMeta: ActionMeta<optionsType>
  ) => {
    // trigger("designPattern");
    // console.log("Values are >>>>: ", values);
    setValue("teams", values);
    console.log("Single project: ", project);
  };

  const handleRemoveValue = (value: string) => {
    const filteredOptions = selected?.filter(
      (item: optionsType) => item.value !== value
    );
    setValue("teams", filteredOptions);
  };

  // console.log("Selected values>>>>: ", selected);

  const handleFormSubmission: SubmitHandler<FieldValues> = async (value) => {
    console.log("Final Values >>>>", value);
    const finalValue = value;
    finalValue.clientName = value.clientName.value;
    try {
      if (project) {
        const res = await updateProjectData(project._id, finalValue);
      } else {
        const res = await addProject(finalValue);
        reset({ clientName: null, teams: null });
      }
    } catch (err) {
      console.log("Error while adding project >>>>", err);
      setError({ message: getErrorMessage(err) });
    }
  };

  return (
    <div className="px-8 py-10">
      <h1 className="text-2xl font-semibold text-time-tracker-gray mb-10">
        Add Edit Project
      </h1>
      <form onSubmit={handleSubmit(handleFormSubmission)} className="relative">
        <div className="bg-white p-8">
          <Input
            inputType="text"
            type="name"
            label=""
            id="projectName"
            placeholder="Project Name"
            defaultValue={project ? project.projectName : ""}
            control={control}
            trigger={trigger}
            errors={errors}
            className="border border-gray-300 p-2 w-[30rem]"
          />
          {/* <input type="text" placeholder="Project Name" name="projectName" /> */}
          {isMounted && (
            <ReactSelect
              id="clientName"
              options={clientOptions}
              control={control}
              errors={errors}
              className="w-[30rem] mb-4"
            />
          )}
          {/* <Input
            inputType="select"
            type="name"
            id="clientName"
            placeholder="client"
            defaultValue={project ? project.clientName : ""}
            options={clients}
            control={control}
            trigger={trigger}
            errors={errors}
            className="border border-gray-300 p-2 w-[30rem] bg-white"
          /> */}
          {/* <select>
          <option value="client">Client</option>
          <option value="Helena">Helena</option>
          <option value="Emily">Emily</option>
          <option value="Lauren">Lauren</option>
          <option value="Sophie">Sophie</option>
        </select> */}
          <Input
            inputType="text"
            type="textThatAllowsSpecialCharactersInBetween"
            id="technology"
            placeholder="Technology"
            defaultValue={project ? project.technology : ""}
            control={control}
            trigger={trigger}
            errors={errors}
            className="border border-gray-300 p-2 w-[30rem]"
          />
          {/* <input type="text" placeholder="Technology" name="technology" /> */}
          <Input
            inputType="number"
            type="number"
            id="hoursAlloted"
            placeholder="Hours Alloted"
            defaultValue={project ? project.hoursAlloted : ""}
            control={control}
            trigger={trigger}
            errors={errors}
            className="border border-gray-300 p-2 w-[30rem]"
          />
          <Input
            inputType="number"
            type="number"
            id="hoursConsumed"
            placeholder="Hours Consumed"
            defaultValue={project ? project.hoursConsumed : ""}
            control={control}
            trigger={trigger}
            errors={errors}
            className="border border-gray-300 p-2 w-[30rem]"
          />
          <Input
            inputType="number"
            type="number"
            id="hoursLeft"
            placeholder="Hours Left"
            defaultValue={project ? project.hoursLeft : ""}
            control={control}
            trigger={trigger}
            errors={errors}
            className="border border-gray-300 p-2 w-[30rem]"
          />
          <Input
            inputType="textarea"
            type="text"
            id="projectDesc"
            placeholder="description"
            defaultValue={project ? project.projectDesc : ""}
            control={control}
            trigger={trigger}
            errors={errors}
            className="border border-gray-300 p-2 w-[70rem]"
          />
          {/* <input type="text" placeholder="Hours Alloted" name="hoursAlloted" /> */}
          {/* <input type="text" placeholder="Hours Consumed" name="hoursConsumed" />
        <input type="text" placeholder="Hours Left" name="hoursLeft" />
        <textarea placeholder="description" rows={10} /> */}
          {isMounted && (
            // <Select
            //   id="designPattern"
            //   options={options}
            //   isMulti
            //   onChange={handleChange}
            //   controlShouldRenderValue={false}
            //   value={selected}
            // />
            <div className="flex space-x-6">
              <h3 className="text-gray-500">Assigned team</h3>
              <ReactSelect
                id="teams"
                options={options}
                isMulti
                onChange={handleChange}
                controlShouldRenderValue={false}
                className="basis-72"
                // value={watch("designPattern")}
                control={control}
                errors={errors}
                // menuIsOpen={true}
                // trigger={trigger}
                // getValues={getValues}
              />
            </div>
          )}
          <div className="flex space-x-2 py-9">
            {selected?.map(({ label, value }) => (
              <div
                key={value}
                className="bg-gray-200 text-gray-500 py-2 px-3 rounded-full flex items-center space-x-3"
              >
                <div>{label}</div>
                <button name={value} onClick={() => handleRemoveValue(value)}>
                  <IoMdClose />
                </button>
              </div>
            ))}
          </div>
        </div>
        <button className="bg-time-tracker-teal px-8 py-2 text-white absolute right-0 mt-4">
          Save
        </button>
      </form>
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
};

export default ProjectsAddEdit;
