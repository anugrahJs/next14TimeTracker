"use client";
import React from "react";
import EmployeeAddEdit from "@/components/EmployeeAddEdit";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getSingleEmployeeData } from "@/utils/http";
import { Employee } from "@/app/(protected)/employees/page";

const EditEmployeePage = () => {
  const { editEmployee } = useParams();
  const [employeeData, setEmployeeData] = useState<Employee | null>(null);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const empData = await getSingleEmployeeData(editEmployee as string);
        console.log("Single Employee Data: ", empData);
        setEmployeeData(empData);
      } catch (err) {
        console.log(
          "Error while fetching employee data in [editEmployee] route: ",
          err
        );
      }
    };
    fetchEmployeeData();
  }, []);

  return <>{employeeData && <EmployeeAddEdit employeeData={employeeData} />}</>;
};

export default EditEmployeePage;
