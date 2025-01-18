import express from 'express';
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";
import {
    addProduct,
    getAllProducts,
    getProductById,
    removeProduct,
    updateProduct,
    getTopPurchasedProducts,
  } from "../controllers/productController.js";
const router = express.Router()


router.route("/")
  .get(getAllProducts)
  .post(authenticate,authorizeAdmin, formidable(),addProduct)
router
  .route("/:id")
  .get(getProductById)
  .put(authenticate, authorizeAdmin, formidable(), updateProduct)
  .delete(authenticate, authorizeAdmin, removeProduct);
router
  .route("/top-products/status")
  .get(getTopPurchasedProducts);

  
export default router;