import { useFormik } from "formik";
import { useEffect, useRef } from "react";
import * as Yup from "yup";
import {
  useCreateInvoiceMutation,
  useGetAllInvoiceQuery,
} from "../../feature/invoice/invoiceApiSlice.ts";
import { useReactToPrint } from "react-to-print";

import InvoicePrint from "../../component/invoice/InvoicePrint.tsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const InvoiceAdd = () => {
  // interface InvoiceItem {
  //   item: string;
  //   quantity: number;
  //   rate: number;
  //   amount: number;
  // }
  // interface InvoiceType {
  //   invoiceNumber: string;
  //   invoiceDate: string;
  //   dueDate: string;
  //   items: InvoiceItem[];
  //   total: number;
  //   amountPaid: number;
  //   dueBalance: number;
  //   paymentStatus: string;
  //   billToName: string;
  //   billToAddress: string;
  //   billToCity: string;
  //   billToState: string;
  //   billToEmail: string;
  //   userName: string;
  //   userEmail: string;
  //   userCity: string;
  //   userState: string;
  //   billToZipCode: string;
  // }
  const navigate = useNavigate();
  const componentRef = useRef<HTMLDivElement>(null);

  // Function to handle printing
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // invoice api
  const [invoiceCreate, { isSuccess, error, isError }] =
    useCreateInvoiceMutation();
  const { data: invoices, refetch } = useGetAllInvoiceQuery("");
  const handleItemChange = (
    index: number,
    field: keyof {
      item: string;
      quantity: number;
      rate: number;
      amount: number;
    },
    value: number | string
  ) => {
    // Update the form values using setValues
    formik.setValues((prevValues) => {
      const updatedItems = [...prevValues.items];
      updatedItems[index] = {
        ...updatedItems[index],
        [field]: value,
      };

      // Recalculate amount if rate or quantity changes
      if (field === "rate" || field === "quantity") {
        const rate = updatedItems[index].rate;
        const quantity = updatedItems[index].quantity;
        const amount = Number(rate) * Number(quantity);

        // Update the amount field
        updatedItems[index].amount = amount;
      }

      // Return the updated values
      return {
        ...prevValues,
        items: updatedItems,
      };
    });
  };

  const formik = useFormik({
    initialValues: {
      invoiceNumber: "",
      invoiceDate: "2018-03-10",
      dueDate: "2018-03-11",
      items: [{ item: "", quantity: 0, rate: 0, amount: 0 }],
      total: 0,
      amountPaid: 0,
      dueBalance: 0,
      paymentStatus: "",
      billToName: "",
      billToAddress: "",
      billToCity: "",
      billToState: "",
      billToEmail: "",
      userName: "",
      userEmail: "",
      userCity: "",
      userState: "",
      billToZipCode: "",
    },
    validationSchema: Yup.object({
      invoiceNumber: Yup.string().required("Invoice number is required"),
      billToName: Yup.string().required("Name is required"),
      billToAddress: Yup.string().required("Address is required"),
      billToCity: Yup.string().required("City is required"),
      billToState: Yup.string().required("State is required"),
      billToZipCode: Yup.string().required("Zip Code is required"),
      billToEmail: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      items: Yup.array().of(
        Yup.object().shape({
          item: Yup.string().required("Item name is required"),
          quantity: Yup.number()
            .min(1, "Quantity must be at least 1")
            .required("Quantity is required"),
          rate: Yup.number()
            .min(1, "Rate must be a positive number")
            .required("Rate is required"),
          amount: Yup.number()
            .min(0, "Amount must be a positive number")
            .required("Amount is required"),
        })
      ),
      total: Yup.number().required("Total is required"),
      amountPaid: Yup.number().required("Amount paid is required"),
      dueBalance: Yup.number().required("Due balance is required"),
      paymentStatus: Yup.string(),
      userName: Yup.string().required("Name is required"),
      userEmail: Yup.string()
        .email("Invalid contact email address")
        .required("Email is required"),
      userCity: Yup.string().required("User city is required"),
      userState: Yup.string().required("User state is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const data = {
        invoiceNumber: values.invoiceNumber,
        client: {
          name: values.billToName,
          email: values.billToEmail,
          street: values.billToAddress,
          city: values.billToCity,
          state: values.billToState,
          zipCode: values.billToZipCode,
        },
        items: values.items,
        totalAmount: values.total,
        amountPaid: values.amountPaid,
        dueBalance: values.dueBalance,
        paymentStatus: values.paymentStatus,
        billBy: {
          name: values.userName,
          email: values.userEmail,
          city: values.userCity,
          state: values.userState,
        },
        dueDate: values.dueDate,
        invoiceDate: values.invoiceDate,
      };
      try {
        const result = await invoiceCreate(data);
        if ("data" in result) {
          // Reset the form and refetch the data
          resetForm();
          refetch();
          navigate("/");
        }
      } catch (error) {
        console.error("Error creating invoice:", error);
      }
    },
  });

  const handleAddItem = () => {
    formik.setValues((prevValues) => ({
      ...prevValues,
      items: [
        ...prevValues.items,
        { item: "", quantity: 0, rate: 0, amount: 0 },
      ],
    }));
  };

  const handleDeleteItem = (index: number) => {
    formik.setValues((prevValues) => {
      const updatedItems = [...prevValues.items];
      updatedItems.splice(index, 1);
      return { ...prevValues, items: updatedItems };
    });
  };
  // Recalculate total whenever items change
  useEffect(() => {
    const newTotal = formik.values.items.reduce(
      (acc, item) => acc + Number(item.amount),
      0
    );

    formik.setFieldValue("total", newTotal);
  }, [formik.values.items]);
  useEffect(() => {
    const paymentStatus = formik.values.dueBalance === 0 ? "Paid" : "Due";
    formik.setFieldValue("paymentStatus", paymentStatus);
  }, [formik.values.dueBalance]);
  //
  // interface InvoiceData {
  //   invoiceNumber: string;
  //   client: {
  //     name: string;
  //     email: string;
  //     street: string;
  //     city: string;
  //     state: string;
  //     zipCode: string;
  //   };
  //   items: {
  //     item: string;
  //     quantity: number;
  //     rate: number;
  //     amount: number;
  //   }[];
  //   totalAmount: number;
  //   amountPaid: number;
  //   dueBalance: number;
  //   paymentStatus: string;
  //   billBy: {
  //     name: string;
  //     email: string;
  //     city: string;
  //     state: string;
  //   };
  //   dueDate: string;
  //   invoiceDate: string;
  // }
  // setData data invoice print
  const data = {
    invoiceNumber: formik.values.invoiceNumber,
    client: {
      name: formik.values.billToName,
      email: formik.values.billToEmail,
      street: formik.values.billToAddress,
      city: formik.values.billToCity,
      state: formik.values.billToState,
      zipCode: formik.values.billToZipCode,
    },
    items: formik.values.items,
    totalAmount: formik.values.total,
    amountPaid: formik.values.amountPaid,
    dueBalance: formik.values.dueBalance,
    paymentStatus: formik.values.paymentStatus,
    billBy: {
      name: formik.values.userName,
      email: formik.values.userEmail,
      city: formik.values.userCity,
      state: formik.values.userState,
    },
    dueDate: formik.values.dueDate,
    invoiceDate: formik.values.invoiceDate,
  };

  return (
    <div className="   pl-20 pr-8 sm:pl-50 overflow-hidden">
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-[900px] px-4 max-w-screen-md-pl-70 sm:px-6 bg-white pb-8 rounded-lg lg:px-8 mx-auto my-4 sm:my-10"
      >
        <div className="flex justify-between">
          <div>
            <h1 className="mt-2 text-lg md:text-xl font-semibold text-blue-600 light:text-white">
              Preline Inc.
            </h1>
          </div>
          <div className="text-end">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 light:text-gray-200">
              Invoice #
            </h2>
            {/* For invoiceNumber */}
            <input
              type="text"
              id="invoiceNumber"
              name="invoiceNumber"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.invoiceNumber}
              placeholder="Your invoice number"
              className="mt-1 block text-center text-gray-500 bg-[#f5f5f5] light:bg-slate-900 p-2 rounded-md w-full"
            />
            {formik.errors.invoiceNumber && formik.touched.invoiceNumber && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.invoiceNumber}
              </div>
            )}

            {/* For userName */}
            <input
              type="text"
              id="userName"
              name="userName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.userName}
              placeholder="Your Name"
              className="mt-1 block text-center text-gray-500 bg-[#f5f5f5] light:bg-slate-900 p-2 rounded-md w-full"
            />
            {formik.errors.userName && formik.touched.userName && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.userName}
              </div>
            )}

            {/* For userEmail */}
            <input
              type="text"
              id="userEmail"
              name="userEmail"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.userEmail}
              placeholder="Your Email"
              className="mt-1 block text-center text-gray-500 bg-[#f5f5f5] light:bg-slate-900 p-2 rounded-md w-full"
            />
            {formik.errors.userEmail && formik.touched.userEmail && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.userEmail}
              </div>
            )}

            {/* For userCity */}
            <input
              type="text"
              id="userCity"
              name="userCity"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.userCity}
              placeholder="Your City"
              className="mt-1 block text-center text-gray-500 bg-[#f5f5f5] light:bg-slate-900 p-2 rounded-md w-full"
            />
            {formik.errors.userCity && formik.touched.userCity && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.userCity}
              </div>
            )}

            {/* For userState */}
            <input
              type="text"
              id="userState"
              name="userState"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.userState}
              placeholder="Your State"
              className="mt-1 block text-center text-gray-500 bg-[#f5f5f5] light:bg-slate-900 p-2 rounded-md w-full"
            />
            {formik.errors.userState && formik.touched.userState && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.userState}
              </div>
            )}
          </div>
        </div>
        <div className="mt-8 grid sm:grid-cols-2 gap-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 light:text-gray-200">
              Bill to:
            </h3>
            {/* For billToName */}
            <input
              type="text"
              id="billToName"
              name="billToName"
              onChange={formik.handleChange}
              onBlur={(e) => {
                formik.handleBlur(e);
                console.log("onBlur event triggered for billToName");
              }}
              value={formik.values.billToName}
              className="mt-1 block text-gray-500 bg-[#f5f5f5] light:bg-slate-900 p-2 rounded-md w-full"
              placeholder="Full Name"
            />

            {formik.errors.billToName && formik.touched.billToName && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.billToName}
              </div>
            )}
            {/* For billToEmail */}
            <input
              type="text"
              id="billToEmail"
              name="billToEmail"
              onChange={formik.handleChange}
              onBlur={(e) => {
                formik.handleBlur(e);
                console.log("onBlur event triggered for billToEmail");
              }}
              value={formik.values.billToEmail}
              className="mt-1 block text-gray-500 bg-[#f5f5f5] light:bg-slate-900 p-2 rounded-md w-full"
              placeholder="Email"
            />
            {formik.errors.billToEmail && formik.touched.billToEmail && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.billToEmail}
              </div>
            )}

            {/* For billToAddress */}
            <input
              type="text"
              id="billToAddress"
              name="billToAddress"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.billToAddress}
              className="mt-2 block text-gray-500 bg-[#f5f5f5] light:bg-slate-900 p-2 rounded-md w-full"
              placeholder="Address"
            />
            {formik.errors.billToAddress && formik.touched.billToAddress && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.billToAddress}
              </div>
            )}

            {/* For billToCity */}
            <input
              type="text"
              id="billToCity"
              name="billToCity"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.billToCity}
              className="mt-2 block text-gray-500 bg-[#f5f5f5] light:bg-slate-900 p-2 rounded-md w-full"
              placeholder="City"
            />
            {formik.errors.billToCity && formik.touched.billToCity && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.billToCity}
              </div>
            )}

            {/* For billToState */}
            <input
              type="text"
              id="billToState"
              name="billToState"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.billToState}
              className="mt-2 block text-gray-500 bg-[#f5f5f5] light:bg-slate-900 p-2 rounded-md w-full"
              placeholder="State"
            />
            {formik.errors.billToState && formik.touched.billToState && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.billToState}
              </div>
            )}
            {/* For billToState */}
            <input
              type="text"
              id="billToZipCode"
              name="billToZipCode"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.billToZipCode}
              className="mt-2 block text-gray-500 bg-[#f5f5f5] light:bg-slate-900 p-2 rounded-md w-full"
              placeholder="Zip Code"
            />
            {formik.errors.billToState && formik.touched.billToZipCode && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.billToZipCode}
              </div>
            )}
          </div>
          <div className="sm:text-end space-y-2">
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
              <div className="grid sm:grid-cols-5 gap-x-3">
                <div className="col-span-3 font-semibold text-gray-800 light:text-gray-200">
                  Invoice date:
                </div>
                <div className="col-span-2 text-gray-500">
                  <input
                    type="date"
                    id="invoiceDate"
                    name="invoiceDate"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.invoiceDate}
                    className="mt-1 block text-gray-500 bg-[#f5f5f5] light:bg-slate-900 p-2 rounded-md w-full"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-5 gap-x-3">
                <div className="col-span-3 font-semibold text-gray-800 light:text-gray-200">
                  Due date:
                </div>
                <div className="col-span-2 text-gray-500">
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dueDate}
                    className="mt-1 block text-gray-500 bg-[#f5f5f5] light:bg-slate-900 p-2 rounded-md w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* service details */}
        <div className="mt-6">
          <div className="border border-gray-200 p-4 rounded-lg space-y-4 light:border-gray-700">
            <div className="grid grid-cols-5 gap-2 font-semibold text-gray-800 light:text-gray-200">
              <div>Service Details</div>
              <div>Quantity</div>
              <div>Rate</div>
              <div>Amount</div>
              <div>Action</div>
            </div>
            {formik.values.items.map((item, index) => (
              <div key={index} className="grid grid-cols-5 gap-2">
                {/* For item name */}
                <input
                  type="text"
                  id={`items[${index}].item`}
                  name={`items[${index}].item`}
                  onChange={(e) =>
                    handleItemChange(index, "item", e.target.value)
                  }
                  onBlur={formik.handleBlur}
                  value={(formik.values.items[index] as { item: string }).item}
                  className={`text-gray-800 border-2 light:text-gray-200 mt-1 block text-gray-500 bg-[#f5f5f5] light:bg-slate-900 p-2 rounded-md w-full ${
                    formik.errors.items &&
                    (formik.errors.items[index] as { item?: string })?.item &&
                    formik.touched.items &&
                    formik.touched.items[index]?.item
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  }`}
                  placeholder="Service Name"
                />
                {/* For quantity */}
                <input
                  type="number"
                  id={`items[${index}].quantity`}
                  name={`items[${index}].quantity`}
                  onChange={(e) => {
                    const value = Math.max(0, Number(e.target.value)); // Ensure non-negative value
                    handleItemChange(index, "quantity", value);
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.items[index].quantity}
                  className={`text-gray-800 border-2 light:text-gray-200 mt-1 block text-gray-500 bg-[#f5f5f5] light:bg-slate-900 p-2 rounded-md w-full ${
                    formik.errors.items &&
                    (formik.errors.items[index] as { quantity?: number })
                      ?.quantity &&
                    formik.touched.items &&
                    formik.touched.items[index]?.quantity
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  }`}
                  placeholder="Quantity"
                />

                {/* For rate */}
                <input
                  type="number"
                  id={`items[${index}].rate`}
                  name={`items[${index}].rate`}
                  onChange={(e) => {
                    const value = Math.max(0, parseFloat(e.target.value)); // Convert string to float
                    handleItemChange(index, "rate", value);
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.items[index].rate}
                  className={`text-gray-800 border-2 light:text-gray-200 mt-1 block bg-[#f5f5f5] light:bg-slate-900 p-2 rounded-md w-full ${
                    formik.errors.items &&
                    (formik.errors.items[index] as { rate?: number })?.rate &&
                    formik.touched.items &&
                    formik.touched.items[index]?.rate
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  }`}
                  placeholder="Rate"
                />

                {/* For amount (read-only) */}
                <input
                  type="text"
                  id={`items[${index}].amount`}
                  name={`items[${index}].amount`}
                  readOnly
                  value={formik.values.items[index].amount}
                  className="sm:text-end text-gray-800 light:text-gray-200 mt-1 block  bg-[#f5f5f5] outline-none light:bg-slate-900 p-2 rounded-md w-full"
                  placeholder="Amount"
                />

                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => handleDeleteItem(index)}
                    className="text-red-500 hover:text-red-700 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            <div className="flex items-center">
              <button
                type="button"
                onClick={handleAddItem}
                className="text-green-500 hover:text-green-700 font-medium"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
        {/* Calculation */}
        <div className="mt-8 flex sm:justify-end">
          <div className="w-full max-w-2xl sm:text-end space-y-2">
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
              <dl className="grid sm:grid-cols-5 gap-x-3">
                <dt className="col-span-3 font-semibold text-gray-800 light:text-gray-200">
                  Total:
                </dt>
                <dd className="col-span-2 text-gray-500">
                  <input
                    type="text"
                    id="total"
                    name="total"
                    readOnly
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.total}
                    className="mt-1 block outline-none text-gray-500 bg-[#f5f5f5] light:bg-slate-900 p-2 rounded-md w-full"
                    placeholder="Total"
                  />
                </dd>
              </dl>

              <div className="grid sm:grid-cols-5 gap-x-3">
                <div className="col-span-3 font-semibold text-gray-800 light:text-gray-200">
                  Amount paid:
                </div>
                <div className="col-span-2 text-gray-500">
                  <input
                    type="text"
                    id="amountPaid"
                    name="amountPaid"
                    onChange={(e) => {
                      const amountPaid = Number(e.target.value);
                      formik.handleChange(e);

                      // Calculate Due Balance
                      const total = formik.values.total;
                      const dueBalance = Math.max(0, total - amountPaid); // Ensure non-negative Due Balance
                      formik.setFieldValue("dueBalance", dueBalance);
                    }}
                    onBlur={formik.handleBlur}
                    value={formik.values.amountPaid}
                    className="mt-1 block text-gray-500 bg-[#f5f5f5]  light:bg-slate-900 p-2 rounded-md w-full"
                    placeholder="Amount Paid"
                  />
                </div>
              </div>
              <dl className="grid sm:grid-cols-5 gap-x-3">
                <dt className="col-span-3 font-semibold text-gray-800 light:text-gray-200">
                  Due balance:
                </dt>
                <dd className="col-span-2 text-gray-500">
                  {/* For dueBalance */}
                  <input
                    type="text"
                    id="dueBalance"
                    name="dueBalance"
                    onChange={(e) => {
                      const dueBalance = Number(e.target.value);
                      formik.handleChange(e);

                      // Set Payment Status based on Due Balance
                      const paymentStatus = dueBalance <= 0 ? "Paid" : "Due";
                      formik.setFieldValue("paymentStatus", paymentStatus);
                    }}
                    onBlur={formik.handleBlur}
                    value={formik.values.dueBalance}
                    className="mt-1 block text-gray-500 bg-[#f5f5f5] light:bg-slate-900 p-2 rounded-md w-full"
                    placeholder="Due Balance"
                  />
                </dd>
              </dl>

              <div className="grid sm:grid-cols-5 gap-x-3">
                <div className="col-span-3 font-semibold text-gray-800 light:text-gray-200">
                  Payment Status:
                </div>
                <div className="col-span-2 text-gray-500">
                  <select
                    className="mt-1 block text-gray-500 bg-[#f5f5f5] light:bg-slate-900 p-2 rounded-md w-full"
                    name="paymentStatus"
                    id="paymentStatus"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.paymentStatus || ""}
                  >
                    <option value="">--Select--</option>
                    <option value="Paid">Paid</option>
                    <option value="Due">Due</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 sm:mt-12">
          <p className="text-gray-500 rounded p-5 bg-blue-200">
            <span className="uppercase font-bold mr-2">Notes:</span>
            All accounts are to be paid within 7 days from receipt of invoice.
            To be paid by cheque or credit card or direct payment online. If
            account is not paid within 7 days the credits details supplied as
            confirmation of work undertaken will be charged the agreed quoted
            fee noted above.
          </p>
        </div>

        {/* Submit Button */}
        <div className="mt-8  flex justify-end">
          <button
            onClick={handlePrint}
            type="submit"
            className="bg-[#339CCB] text-white px-4 mr-5 py-2 rounded-md hover:bg-[#0c82b8]"
          >
            Print & Save Invoice
          </button>
          <button
            type="submit"
            className="bg-[#53BD70] text-white px-4 py-2 rounded-md hover:bg-[#04962b]"
          >
            Create Invoice
          </button>
        </div>
      </form>
      <div className="hidden">
        <InvoicePrint refP={componentRef} data={data} />{" "}
      </div>
    </div>
  );
};

export default InvoiceAdd;
