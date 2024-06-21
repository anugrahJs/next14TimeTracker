import React from "react";
import Employees from "@/components/Employees";
import { auth } from "@/lib/auth";

const EmployeesPage = async () => {
  const session = await auth();

  return <Employees session={session} />;
};

export default EmployeesPage;
