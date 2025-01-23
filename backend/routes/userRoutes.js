import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getUserProfil,
  updateUserProfil,
  deleteUserById,
  getUserById,
  updateUserById,
  forgotPassword,
  verifyResetCode,
  sendUsMessage,
} from "../controllers/userController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(createUser)
  .get(authenticate, authorizeAdmin, getAllUsers);

router.post("/auth", loginUser);
router.post("/logout", logoutUser);
router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-code", verifyResetCode);
router.post("/send-us-message", sendUsMessage);

router
  .route("/profile")
  .get(authenticate, getUserProfil)
  .put(authenticate, updateUserProfil);

// ADMIN ROUTES 👇
router
  .route("/:id")
  .delete(authenticate, authorizeAdmin, deleteUserById)
  .get(authenticate, authorizeAdmin, getUserById)
  .put(authenticate, authorizeAdmin, updateUserById);

export default router;