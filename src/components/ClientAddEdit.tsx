"use client";
import React from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import Input from "@/components/Input";
import { useState, useEffect, useMemo } from "react";
import ReactSelect from "@/components/ReactSelect";
import { addClient } from "@/utils/http";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { clientType } from "./Clients";
import { updateClientData } from "@/utils/http";

const ClientAddEdit = ({ clientData }: { clientData?: clientType }) => {
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

  type countriesType = { value: string; label: string };

  const [isMounted, setIsMounted] = useState(false);
  const [countries, setCountries] = useState<countriesType[]>([]);
  const [error, setError] = useState({ message: "" });

  useEffect(() => {
    setIsMounted(true);
    const fetchCountries = async () => {
      const res = await fetch(
        "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
      );

      const resData = await res.json();
      setCountries(resData?.countries);
    };
    fetchCountries();

    if (clientData) {
      setValue("clientCountry", clientData?.clientCountry);
    }
  }, []);

  const handleFormSubmission: SubmitHandler<FieldValues> = async (value) => {
    try {
      if (clientData) {
        await updateClientData(clientData?._id, value);
        reset({
          clientName: "",
          contactNumber: "",
          email: "",
          clientCountry: null,
        });
      } else {
        await addClient(value);
        reset({
          clientName: "",
          contactNumber: "",
          email: "",
          clientCountry: null,
        });
      }
    } catch (err) {
      console.log(
        "Error occured while adding new client in the frontend: ",
        err
      );
      setError({ message: getErrorMessage(err) });
    }
  };

  return (
    <div className="px-8 py-10">
      <h1 className="text-2xl font-semibold text-time-tracker-gray mb-10">
        Add/Edit Client
      </h1>
      <form onSubmit={handleSubmit(handleFormSubmission)} className="relative">
        <div className="bg-white p-8">
          <Input
            inputType="text"
            type="name"
            id="clientName"
            placeholder="Client Name"
            defaultValue={clientData ? clientData.clientName : ""}
            control={control}
            trigger={trigger}
            errors={errors}
            className="border border-gray-300 p-2 w-[30rem]"
          />
          <Input
            inputType="number"
            type="number"
            id="contactNumber"
            placeholder="Contact Number"
            defaultValue={clientData ? clientData.contactNumber : ""}
            control={control}
            trigger={trigger}
            errors={errors}
            className="border border-gray-300 p-2 w-[30rem]"
          />
          <Input
            inputType="text"
            type="email"
            id="email"
            placeholder="Email"
            defaultValue={clientData ? clientData.email : ""}
            control={control}
            trigger={trigger}
            errors={errors}
            className="border border-gray-300 p-2 w-[30rem]"
          />
          {isMounted && (
            <ReactSelect
              id="clientCountry"
              control={control}
              options={countries}
              errors={errors}
              className="w-[30rem] mb-4"
            />
          )}
        </div>
        <button className="bg-time-tracker-teal px-8 py-2 text-white absolute right-0 mt-4">
          Save
        </button>
        {error && <p className="text-red-500">{error?.message}</p>}
      </form>
    </div>
  );
};

export default ClientAddEdit;
