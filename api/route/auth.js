import express from "express";
import { login, logout, register,loggedInUser, verifyUser } from "../controllers/authController.js";
import tokenVerity from "../middlewares/verifyToken.js";

const router = express.Router();

// create router
router.route("/login").post(login);
router.route("/verify/:token").get(verifyUser);
router.route("/logout").post(logout);
router.route("/register").post(register);
router.route("/me").get(tokenVerity,loggedInUser);

// export default router
export default router;
