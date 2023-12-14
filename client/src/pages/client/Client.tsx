import React, { useEffect, useRef, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";

import { MdDeleteOutline } from "react-icons/md";
import { MdPrint } from "react-icons/md";

import {
  useDeleteClientMutation,
  useGetAllClientQuery,
} from "../../feature/client/clientApiSlice.ts";
import { toast } from "react-toastify";

interface ClientData {
  name: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  _id: string;
}

const Client: React.FC = () => {
  const { data, error, isLoading, refetch } = useGetAllClientQuery("");
  const [deleteClient] = useDeleteClientMutation();
  console.log(data, "client data");

  // delte handle
  const handleDelete = async (id: string) => {
    const result = await deleteClient({ id });
    if ("data" in result) {
      toast.success("Client Delete Successfull", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
    if ("error" in result) {
      toast.error("Something Wrong Data Not Delete", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
    refetch();
  };

  const columns: TableColumn<ClientData>[] = [
    {
      name: "Client Name",
      selector: (row: ClientData) => row?.name,
      sortable: true,
    },
    {
      name: "Client Email",
      selector: (row: ClientData) => row?.email,
      sortable: true,
    },
    {
      name: "Client Street",
      selector: (row: ClientData) => row?.street,
      sortable: true,
    },
    {
      name: "Client City",
      selector: (row: ClientData) => row?.city,
      sortable: true,
    },
    {
      name: "Client State",
      selector: (row: ClientData) => row.state,
      sortable: true,
    },
    {
      name: "Client Postal Code",
      selector: (row: ClientData) => row.zipCode,
      sortable: true,
    },

    {
      name: "Action",
      selector: (row: ClientData) => (
        <>
          <button
            onClick={() => handleDelete(row._id)}
            className=" rounded bg-red-500 hover:bg-white hover:text-red-500  p-1 "
          >
            <MdDeleteOutline className="h-6  w-6  hover:text-red-500  text-white" />
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="mt-5 p-10">
      <div className="">
        <div className="flex justify-start mr-5">
          <p className="text-white max-w-[250px] flex justify-center items-center bg-[#53BD70] hover:bg-[#53BD70] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:focus:ring-[#53BD70]">
            Client Data
          </p>
        </div>
        <br />
        <br />
        <DataTable
          fixedHeader
          pagination
          className="shadow-sm"
          title="All Client Data"
          columns={columns}
          data={data || []}
          selectableRows
          highlightOnHover
        />
      </div>
    </div>
  );
};

export default Client;
