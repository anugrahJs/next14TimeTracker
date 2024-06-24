"use client";
import React from "react";
import Input from "@/components/Input";
import { FieldValues, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import ReactSelect from "@/components/ReactSelect";
import { MultiValue, ActionMeta } from "react-select";
import { IoMdClose } from "react-icons/io";
import { addEmployeeData } from "@/utils/http";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { updateEmployeeData } from "@/utils/http";
import { addUser } from "@/utils/http";

type optionsType = {
  val: number;
  value: string;
  label: string;
};

export type employeeType = {
  empName: string;
  empId: string;
  designation: optionsType;
  department: optionsType;
  permission: optionsType[];
  technologies: optionsType[];
  _id: string;
};

const designationOptions = [
  { val: 1, value: "softwareEngineer", label: "Software Engineer" },
  { val: 2, value: "qualityAnalyst", label: "Quality Assurance Engineer" },
  { val: 3, value: "projectManager", label: "Project Manager" },
  {
    val: 4,
    value: "businessDevelopmentExecutive",
    label: "Business Development Executive",
  },
  { val: 5, value: "devopsEngineer", label: "Devops Engineer" },
];

const departmentOptions = [
  { val: 1, value: "development", label: "Development" },
  { val: 2, value: "qualityAssurance", label: "Quality Assurance" },
  { val: 3, value: "projectManagement", label: "Project Management" },
  {
    val: 4,
    value: "businessDevelopment",
    label: "Business Development",
  },
  {
    val: 5,
    value: "montoringAndMaintenance",
    label: "Monitoring and Maintenance",
  },
];

const technologyOptions = [
  { val: 1, value: "android", label: "Android" },
  { val: 2, value: "ios", label: "IOS" },
  { val: 3, value: "node.js", label: "Node.js" },
  { val: 4, value: "next.js", label: "Next.js" },
  { val: 5, value: "react.js", label: "React.js" },
];

const permissionOptions = [
  { val: 1, value: "Shail Sharma", label: "Shail Sharma" },
  { val: 2, value: "Ankit Ahuja", label: "Ankit Ahuja" },
  { val: 3, value: "Mayank Kansal", label: "Mayank Kansal" },
  { val: 4, value: "Rishabh Dahiya", label: "Rishabh Dahiya" },
  { val: 5, value: "Anuj", label: "Anuj" },
];

const EmployeeAddEdit = ({
  employeeData,
}: {
  employeeData?: employeeType | null;
}) => {
  const {
    control,
    trigger,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  //useForm({mode: "onChange"})

  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState<{ message: string }>();

  useEffect(() => {
    setIsMounted(true);

    if (employeeData) {
      setValue("designation", employeeData?.designation);
      setValue("department", employeeData?.department);
      setValue("technologies", employeeData?.technologies);
      setValue("permission", employeeData?.permission);
    }
  }, [employeeData]);

  let selectedTechnologies: optionsType[] | [] = watch("technologies") || [];
  let selectedPermission: optionsType[] | [] = watch("permission") || [];

  const handleChange = (
    values: MultiValue<optionsType>,
    actionMeta: ActionMeta<optionsType>
  ) => {
    setValue("technologies", values);
  };

  //to remove the selected technologies
  const handleRemoveTechnology = (value: string) => {
    const remainingTechnologies = selectedTechnologies.filter(
      (technology) => technology.value !== value
    );
    setValue("technologies", remainingTechnologies);
  };

  //to remove the selected permission
  const handleRemovePermission = (value: string) => {
    const remainingPermission = selectedPermission.filter(
      (permission) => permission.value !== value
    );
    setValue("permission", remainingPermission);
  };

  //handle form submission
  const handleFormSubmission = async (value: FieldValues) => {
    try {
      if (employeeData) {
        await updateEmployeeData(employeeData?._id, value);
        reset({
          empName: "",
          empId: "",
          designation: null,
          department: null,
          technologies: null,
          permission: null,
        });
      } else {
        await addEmployeeData(value);
        await addUser(value);
        reset({
          empName: "",
          empId: "",
          designation: null,
          department: null,
          technologies: null,
          permission: null,
        });
      }
    } catch (err) {
      console.log("Error while adding new employee: ", err);
      setError({ message: getErrorMessage(err) });
    }
  };

  return (
    <div className="px-8 py-10">
      <h1 className="text-2xl font-semibold text-time-tracker-gray mb-10">
        Add/Edit Employees
      </h1>
      <form onSubmit={handleSubmit(handleFormSubmission)} className="relative">
        <div className="bg-white p-8">
          <Input
            inputType="text"
            type="name"
            label=""
            id="empName"
            placeholder="Name"
            defaultValue={employeeData ? employeeData?.empName : ""}
            control={control}
            trigger={trigger}
            errors={errors}
            className="border border-gray-300 p-2 w-[30rem]"
          />
          <Input
            inputType="text"
            type="text"
            label=""
            id="empId"
            placeholder="Code"
            defaultValue={employeeData ? employeeData?.empId : ""}
            control={control}
            trigger={trigger}
            errors={errors}
            className="border border-gray-300 p-2 w-[30rem]"
          />
          {isMounted && (
            <ReactSelect
              id="designation"
              options={designationOptions}
              control={control}
              errors={errors}
              className="w-[30rem] mb-4"
            />
          )}
          {isMounted && (
            <ReactSelect
              id="department"
              options={departmentOptions}
              control={control}
              errors={errors}
              className="w-[30rem] mb-4"
            />
          )}
          <div className="flex space-x-6 w-[30rem]">
            <h3 className="text-gray-500">Technologies</h3>
            <div className="w-full">
              {isMounted && (
                <ReactSelect
                  id="technologies"
                  options={technologyOptions}
                  control={control}
                  errors={errors}
                  isMulti
                  onChange={handleChange}
                  controlShouldRenderValue={false}
                  className="basis-72"
                />
              )}
              <div className="flex flex-wrap space-x-2 py-9">
                {selectedTechnologies?.map(({ label, value }) => (
                  <div
                    key={value}
                    className="bg-gray-200 text-gray-500 py-2 px-3 rounded-full flex items-center space-x-3"
                  >
                    <div>{label}</div>
                    <button
                      name={value}
                      onClick={() => handleRemoveTechnology(value)}
                    >
                      <IoMdClose />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex space-x-6 w-[30rem]">
            <h3 className="text-gray-500">Permission</h3>
            <div className="w-full">
              {isMounted && (
                <ReactSelect
                  id="permission"
                  options={permissionOptions}
                  control={control}
                  errors={errors}
                  isMulti
                  onChange={handleChange}
                  controlShouldRenderValue={false}
                  className="basis-72"
                />
              )}
              <div className="flex flex-wrap space-x-2 py-9">
                {selectedPermission?.map(({ label, value }) => (
                  <div
                    key={value}
                    className="bg-gray-200 text-gray-500 py-2 px-3 rounded-full flex items-center space-x-3"
                  >
                    <div>{label}</div>
                    <button
                      name={value}
                      onClick={() => handleRemovePermission(value)}
                    >
                      <IoMdClose />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <button className="bg-time-tracker-teal px-8 py-2 text-white absolute right-0 mt-4">
          Save
        </button>
        {error && <p className="text-red-500">{error?.message}</p>}
      </form>
    </div>
  );
};

export default EmployeeAddEdit;
