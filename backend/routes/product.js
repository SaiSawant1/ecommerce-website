import express from "express";
import {
  deleteProduct,
  getProductDetail,
  getProducts,
  newProduct,
  updateProductDetails,
} from "../controllers/productControllers.js";

const router = express.Router();

router.route("/products").get(getProducts);
router.route("/admin/products").post(newProduct);
router.route("/products/:id").get(getProductDetail);
router.route("/products/:id").put(updateProductDetails);
router.route("/products/:id").delete(deleteProduct);

export default router;
