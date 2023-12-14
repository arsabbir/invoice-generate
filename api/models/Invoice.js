import mongoose from "mongoose";

const invoiceSchema = mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
    },
    client: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
      },
      street: String,
      city: String,
      state: String,
      zipCode: String,
    },
    items: [
      {
        item: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
        rate: {
          type: Number,
          required: true,
        },
      },
    ],
    billBy: {
      name: String,
      email: String,
      city: String,
      state: String,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    invoiceDate: {
      type: Date,
      required: true,
    },
    amountPaid: {
      type: Number,
      default: 0,
    },
    dueBalance: {
      type: Number,
      default: 0,
    },

    users: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    trash: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Invoice", invoiceSchema);
