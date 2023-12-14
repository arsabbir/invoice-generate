import asyncHandler from "express-async-handler";
import Invoice from "../models/Invoice.js";
import Client from "../models/Client.js";

/**
 * @DESC Get all invoices
 * @ROUTE /api/v1/invoices
 * @method GET
 * @access public
 */
export const getAllInvoices = asyncHandler(async (req, res) => {
  const invoices = await Invoice.find();
  const user = req.me;
  const userInvoices = invoices.filter(
    (data) => data.users.toString() === user._id.toString()
  );

  if (invoices.length === 0) {
    return res.status(404).json({ message: "Invoice data not found" });
  }
  res.status(200).json(userInvoices);
});

/**
 * @DESC Get Single invoice
 * @ROUTE /api/v1/invoices/:id
 * @method GET
 * @access public
 */
export const getSingleInvoice = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const invoice = await Invoice.findById(id);

  if (!invoice) {
    return res.status(404).json({ message: "Invoice not found" });
  }

  res.status(200).json(invoice);
});

/**
 * @DESC Create new Invoice
 * @ROUTE /api/v1/invoices
 * @method POST
 * @access public
 */
export const createInvoice = asyncHandler(async (req, res) => {
  // Extract values from request body
  const {
    invoiceNumber,
    client,
    items,
    totalAmount,
    amountPaid,
    dueBalance,
    billBy,
    invoiceDate,
    dueDate,
    paymentStatus,
  } = req.body;

  // Validate required fields
  if (
    !invoiceNumber ||
    !client ||
    !items ||
    !totalAmount ||
    !dueDate ||
    !paymentStatus
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const user = req.me._id;
  // check client
  const existClient = await Client.findOne({ email: client.email });

  if (!existClient || existClient == null) {
    client.users = user;
    const createClient = await Client.create(client);
  }

  // Create new invoice
  const invoice = await Invoice.create({
    invoiceNumber,
    client,
    items,
    totalAmount,
    amountPaid,
    dueBalance,
    billBy,
    invoiceDate,
    dueDate,
    paymentStatus,
    users: user,
  });

  res.status(200).json({ invoice, message: "Invoice created successfully" });
});

/**
 * @DESC Delete Invoice
 * @ROUTE /api/v1/invoices/:id
 * @method DELETE
 * @access public
 */
export const deleteInvoice = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id, "delte invoice");
  const invoice = await Invoice.findByIdAndDelete(id);

  res.status(200).json({ invoice, message: "Invoice deleted successfully" });
});

/**
 * @DESC Update Invoice
 * @ROUTE /api/v1/invoices/:id
 * @method PUT/PATCH
 * @access public
 */
export const updateInvoice = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const updatedInvoice = req.body;

  const invoice = await Invoice.findByIdAndUpdate(id, updatedInvoice, {
    new: true,
  });

  res.status(200).json(invoice);
});
