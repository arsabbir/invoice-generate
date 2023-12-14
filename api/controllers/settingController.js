import asyncHandler from "express-async-handler";
import Client from "../models/Client.js";

import { v2 as cloudinary } from "cloudinary";
import Setting from "../models/Setting.js";
cloudinary.config({
  cloud_name: "drq2ieflq",
  api_key: "718961483599887",
  api_secret: "zaM4dfcS2djdofxgDNhLla_tABk",
});

/**
 * @DESC Get all settings
 * @ROUTE /api/v1/setting
 * @method GET
 * @access public
 */
export const getAllSettings = asyncHandler(async (req, res) => {
  const settings = await Setting.find();

  if (settings.length === 0) {
    return res.status(404).json({ message: "Settings data not found" });
  }

  res.status(200).json(settings);
});

/**
 * @DESC Get Single setting
 * @ROUTE /api/v1/setting/:id
 * @method GET
 * @access public
 */
export const getSingleSetting = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const setting = await Setting.findById(id);

  if (!setting) {
    return res.status(404).json({ message: "Setting not found" });
  }

  res.status(200).json(setting);
});

/**
 * @DESC Create new Setting
 * @ROUTE /api/v1/setting
 * @method POST
 * @access public
 */
export const createSetting = asyncHandler(async (req, res) => {
  // Extract values from request body
  const { favicon, title, brandName } = req.body;

  // Validate required fields
  let logoP = "";
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path);
    logoP = result.secure_url;
  }

  // Create new setting with default values
  const settingData = {
    logo:
      logoP ||
      "https://zeevector.com/wp-content/uploads/Fedex-Express-Logo-PNG-Transparent.png",
    favicon:
      favicon ||
      "https://zeevector.com/wp-content/uploads/Fedex-Express-Logo-PNG-Transparent.png",
    title: title || "INVOICE",
    brandName: brandName || "BRANDNAME",
    trash: false,
  };

  const setting = await Setting.create(settingData);
  res.status(200).json({ setting, message: "Setting created successfully" });
});

/**
 * @DESC Delete Setting
 * @ROUTE /api/v1/setting/:id
 * @method DELETE
 * @access public
 */
export const deleteSetting = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const setting = await Setting.findByIdAndDelete(id);

  if (!setting) {
    return res.status(404).json({ message: "Setting not found" });
  }

  res.status(200).json(setting);
});

/**
 * @DESC Update Setting
 * @ROUTE /api/v1/setting/:id
 * @method PUT/PATCH
 * @access public
 */
export const updateSetting = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { id } = req.params;

  const { title, favicon } = req.body;

  const setting = await Setting.findById(id);

  if (!setting) {
    return res.status(404).json({ message: "Setting data not found" });
  }
  // // Check if a file was uploaded
  if (req.file) {
    console.log(req.file);
    // Delete the previous photo if it exists
    if (setting.logo) {
      const publicId = setting.logo.match(/\/([^/]+)$/)[1].split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }

    const result = await cloudinary.uploader.upload(req.file.path);
    // console.log(result.secure_url);
    // Update the brand's photo field with the new photo data
    setting.logo = result.secure_url;
  }

  // const setting = await Setting.findByIdAndUpdate(id, updatedSetting, {
  //   new: true,
  // });

  setting.title = title;
  setting.favicon = favicon;
  await setting.save();
  res
    .status(200)
    .json({ setting, message: "Setting data updated successfully" });
});
