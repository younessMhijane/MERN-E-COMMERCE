import express from "express";
const router = express.Router();

import {
  createOrder,
  getAllOrders,
  getUserOrders,
  countTotalOrders,
  updateStatus,
} from "../controllers/cartController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

router
  .route("/")
  .post(authenticate, createOrder)
  .get(authenticate, authorizeAdmin, getAllOrders);

  router.route("/:id/status").put(authenticate, authorizeAdmin, updateStatus);

router.route("/mine").get(authenticate, getUserOrders);
router.route("/total-orders").get(authenticate, countTotalOrders); // Ajout de la route pour le total
export default router;
