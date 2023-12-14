import React, { useEffect, useRef, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { MdPrint } from "react-icons/md";
import {
  useDeleteInvoiceMutation,
  useGetAllInvoiceQuery,
} from "../../feature/invoice/invoiceApiSlice.ts";
import InvoicePrint from "../../component/invoice/InvoicePrint.tsx";
import { useReactToPrint } from "react-to-print";

interface InvoiceData {
  invoiceNumber: string;
  client: {
    name: string;
    email: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  items: {
    item: string;
    quantity: number;
    rate: number;
    amount: number;
  }[];
  totalAmount: number;
  amountPaid: number;
  dueBalance: number;
  paymentStatus: string;
  billBy: {
    name: string;
    email: string;
    city: string;
    state: string;
  };
  dueDate: string;
  invoiceDate: string;
}

const InvoiceList: React.FC = () => {
  const { data, error, isLoading, refetch } = useGetAllInvoiceQuery("ok");
  const [deleteInvoice] = useDeleteInvoiceMutation();
  const [sendPrint, setSendPrint] = useState<InvoiceData | null>(null);

  // delte handle
  const handleDelete = async (id) => {
    console.log(id, "delete");

    await deleteInvoice({ id });

    refetch();
  };
  const componentRef = useRef<HTMLDivElement>(null);
  // handle print
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  // useEffect to trigger print when sendPrint is updated
  useEffect(() => {
    if (sendPrint) {
      handlePrint();
    }
  }, [sendPrint, handlePrint]);

  const printHandler = (row: InvoiceData) => {
    setSendPrint(row);
  };

  const columns: TableColumn<InvoiceData>[] = [
    {
      name: "Invoice Number",
      selector: (row: InvoiceData) => row.invoiceNumber,
      sortable: true,
    },
    {
      name: "Client Name",
      selector: (row: InvoiceData) => row.client.name,
      sortable: true,
    },
    {
      name: "Client Email",
      selector: (row: InvoiceData) => row.client.email,
      sortable: true,
    },
    {
      name: "Payement Status",
      selector: (row: InvoiceData) => row.paymentStatus,
      sortable: true,
    },
    {
      name: "Invoice Create Date",
      selector: (row: InvoiceData) => row.invoiceDate,
      sortable: true,
    },
    {
      name: "Total Amount",
      selector: (row: InvoiceData) => row.totalAmount,
      sortable: true,
    },
    {
      name: "Amount Paid",
      selector: (row: InvoiceData) => row.amountPaid,
      sortable: true,
    },
    {
      name: "Due Balance",
      selector: (row: InvoiceData) => row.dueBalance,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row: InvoiceData) => (
        <>
          <button
            onClick={() => handleDelete(row._id)}
            className=" rounded bg-red-500 hover:bg-white hover:text-red-500  p-1 "
          >
            <MdDeleteOutline className="h-6  w-6  hover:text-red-500  text-white" />
          </button>
          <button
            onClick={() => printHandler(row)}
            className=" rounded bg-green-500 ml-2 hover:bg-white hover:text-red-500  p-1 "
          >
            <MdPrint className="h-6  w-6  hover:text-green-500  text-white" />
          </button>
        </>
      ),
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>; // Handle loading state
  }

  if (error) {
    return <div>Error loading data</div>; // Handle error state
  }

  return (
    <div className="mt-5 p-10">
      <div className="">
        <div className="flex justify-start mr-5">
          <Link
            to="/invoice-add"
            className="text-white max-w-[250px] flex justify-center items-center bg-[#53BD70] hover:bg-[#53BD70] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:focus:ring-[#53BD70]"
          >
            Add new InvoiceData
          </Link>
        </div>
        <br />
        <br />
        <DataTable
          fixedHeader
          pagination
          className="shadow-sm"
          title="All Invoices Data"
          columns={columns}
          data={data || []}
          selectableRows
          highlightOnHover
        />
        <div className="hidden">
          <InvoicePrint refP={componentRef} data={sendPrint} />{" "}
        </div>
      </div>
    </div>
  );
};

export default InvoiceList;
