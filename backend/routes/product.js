import express from "express";
import {
  createProductReview,
  deleteProduct,
  deleteProductReview,
  getProductDetail,
  getProductReviews,
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
  .route("/admin/products/:id")
  .put(isAuthenticatedUser, authorizeRole("admin"), updateProductDetails);

router
  .route("/admin/products/:id")
  .delete(isAuthenticatedUser, authorizeRole("admin"), deleteProduct);

router
  .route("/reviews")
  .put(isAuthenticatedUser, createProductReview)
  .get(isAuthenticatedUser, getProductReviews);

router
  .route("/admin/reviews")
  .delete(isAuthenticatedUser, authorizeRole("admin"), deleteProductReview);
export default router;
