import React from "react";
import Clients from "@/components/Clients";
import { auth } from "@/lib/auth";

const ClientsPage = async () => {
  const session = await auth();
  return <Clients session={session} />;
};

export default ClientsPage;
