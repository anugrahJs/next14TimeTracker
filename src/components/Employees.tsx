"use client";
import React, { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { IoAddCircleOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { getEmployees } from "@/utils/http";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { SlOptionsVertical } from "react-icons/sl";
import { deleteEmployee } from "@/utils/http";
import { Session } from "next-auth";
import { sessionUserType } from "@/lib/auth.config";

type optionsType = {
  val: number;
  value: string;
  label: string;
};

export type Employee = {
  empName: string;
  empId: string;
  designation: optionsType;
  department: optionsType;
  permission: optionsType[];
  technologies: optionsType[];
  _id: string;
};

const Employees = ({ session }: { session: Session | null }) => {
  const [error, setError] = useState({ message: "" });
  const [selectedCode, setSelectedCode] = useState("code");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isVisible, setIsVisible] = useState("");
  const [refetch, setRefetch] = useState(false);

  const mySession = session as sessionUserType;

  useEffect(() => {
    const fetchEmployeesFromBackend = async () => {
      try {
        const employees = await getEmployees();
        setEmployees(employees);
      } catch (err) {
        console.log("Error while fetching data on employees page: ", err);
        setError({ message: getErrorMessage(err) });
      }
    };
    fetchEmployeesFromBackend();
  }, [refetch]);

  const handleSelectedCode = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCode(e.target.value);
  };

  return (
    <div className="px-8 py-10 text-gray-600">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-time-tracker-gray">
          Employees
        </h1>
        {mySession?.user.isAdmin && (
          <button className="bg-time-tracker-teal text-white px-3 py-2 flex items-center space-x-2">
            <IoAddCircleOutline className="text-xl" />
            <Link href="/admin/employee/addEmployee">ADD NEW EMPLOYEE</Link>
          </button>
        )}
      </div>
      <form className="bg-[#ffffff] p-2 my-10 flex justify-between">
        <select
          value={selectedCode}
          onChange={handleSelectedCode}
          className="bg-[#ffffff] pl-4"
        >
          <option value="code" disabled>
            Code
          </option>
          <option value="KB110">KB110</option>
          <option value="KB111">KB111</option>
          <option value="KB112">KB112</option>
          <option value="KB113">KB113</option>
          <option value="KB114">KB114</option>
        </select>
        <div className="space-x-3 basis-3/5 flex">
          <input
            type="text"
            placeholder="Search by project name"
            className="bg-[#f9f9f9] px-2 py-2 basis-11/12"
          />
          <button className="bg-time-tracker-teal text-white py-2 px-3 h-full">
            SEARCH
          </button>
        </div>
      </form>
      <div className="text-sm border border-slate-300">
        <div className="flex bg-[#e9e9e9] px-5 py-3  text-gray-500">
          <h2 className="basis-2/12">Name</h2>
          <h2 className="basis-2/12">Code</h2>
          <h2 className="basis-2/12">Designation</h2>
          <h2 className="basis-2/12">Department</h2>
          <h2>Technologies</h2>
        </div>
      </div>
      <div>
        {employees.map((employee) => (
          <SingleEmployee
            employee={employee}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            refetch={refetch}
            setRefetch={setRefetch}
            key={employee?._id}
          />
        ))}
      </div>
    </div>
  );
};

export default Employees;

type singleEmployeeProps = {
  employee: Employee;
  isVisible: string;
  setIsVisible: Dispatch<SetStateAction<string>>;
  refetch: boolean;
  setRefetch: Dispatch<SetStateAction<boolean>>;
};

const SingleEmployee = ({
  employee,
  isVisible,
  setIsVisible,
  refetch,
  setRefetch,
}: singleEmployeeProps) => {
  const [error, setError] = useState({ message: "" });

  const handleDelete = async (empId: string) => {
    try {
      await deleteEmployee(empId);
      setRefetch(!refetch);
    } catch (err) {
      console.log("Error while deleting employee: ", err);
      setError({ message: getErrorMessage(err) });
    }
  };

  return (
    <>
      <div className="flex px-5 py-4 bg-[#fff] border border-slate-300 border-t-0">
        <div className="basis-2/12 text-time-tracker-teal2 before:content-['\2022'] before:mr-2">
          {employee?.empName}
        </div>
        <div className="basis-2/12">{employee?.empId}</div>
        <div className="basis-2/12">{employee?.designation?.label}</div>
        <div className="basis-2/12">{employee?.department?.label}</div>
        <div className="flex justify-between basis-4/12">
          <div className="flex space-x-2">
            {employee?.technologies?.map((technology) => (
              <div key={technology?.value}>{`${technology?.label},`}</div>
            ))}
          </div>
          <button
            className="relative"
            onClick={() => {
              if (isVisible === employee?._id) {
                setIsVisible("");
              } else {
                setIsVisible(employee?._id);
              }
            }}
          >
            <dialog
              open={isVisible === employee?._id}
              className="absolute -top-3 -left-20 bg-slate-100 rounded-sm"
            >
              <ul>
                <li>
                  <div>
                    <Link href={`/admin/employee/${employee?._id}`}>Edit</Link>
                  </div>
                </li>
                <li>
                  <div onClick={() => handleDelete(employee?._id)}>Delete</div>
                </li>
              </ul>
            </dialog>
            <SlOptionsVertical />
          </button>
          {error && <p className="text-red-500">{error?.message}</p>}
        </div>
      </div>
    </>
  );
};
