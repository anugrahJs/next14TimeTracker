"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getErrorMessage } from "@/utils/getErrorMessage";
import ClientAddEdit from "@/components/ClientAddEdit";
import { clientType } from "@/components/Clients";
import { getSingleClientData } from "@/utils/http";

const EditClientDataPage = () => {
  const { editClientData } = useParams();
  const [clientData, setClientData] = useState<clientType>();

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const clientData: clientType = await getSingleClientData(
          editClientData as string
        );
        setClientData(clientData);
      } catch (err) {
        console.log(
          "Error while fetching individual client data in [editClientData] page: ",
          err
        );
      }
    };
    fetchClientData();
  }, []);
  return <>{clientData && <ClientAddEdit clientData={clientData} />}</>;
};

export default EditClientDataPage;
