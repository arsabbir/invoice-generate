import express from "express";

import {
  createSetting,
  deleteSetting,
  getAllSettings,
  getSingleSetting,
  updateSetting,
} from "../controllers/settingController.js";
import tokenVerify from "../middlewares/verifyToken.js";
import { logo } from "../utils/multer.js";
const router = express.Router();

// Use verify token middleware
router.use(tokenVerify);

// Create routes
router.route("/").get(getAllSettings).post(logo,createSetting);
router
  .route("/:id")
  .get(getSingleSetting)
  .delete(deleteSetting)
  .put(logo,updateSetting);

// Export the router
export default router;
