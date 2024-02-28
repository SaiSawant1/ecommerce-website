import express from "express";
import {
  deleteProduct,
  getProductDetail,
  getProducts,
  newProduct,
  updateProductDetails,
} from "../controllers/productControllers.js";
import { authorizeRole, isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

router.route("/products").get(getProducts);
router
  .route("/admin/products")
  .post(isAuthenticatedUser, authorizeRole("admin"), newProduct);
router.route("/products/:id").get(getProductDetail);
router
  .route("/products/:id")
  .put(isAuthenticatedUser, authorizeRole("admin"), updateProductDetails);
router
  .route("/products/:id")
  .delete(isAuthenticatedUser, authorizeRole("admin"), deleteProduct);

export default router;
