import mongoose from "mongoose";

const settingSchema = mongoose.Schema(
  {
    logo: {
      type: String,
      default:
        "https://zeevector.com/wp-content/uploads/Fedex-Express-Logo-PNG-Transparent.png",
    },
    favicon: {
      type: String,
      default:
        "https://zeevector.com/wp-content/uploads/Fedex-Express-Logo-PNG-Transparent.png",
    },
    title: {
      type: String,
      default: "INVOICE",
    },
    brandName: {
      type: String,
      default: "BRANDNAME",
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

export default mongoose.model("Setting", settingSchema);
