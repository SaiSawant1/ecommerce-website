import express from "express";
import {
  deleteUser,
  forgotPassword,
  getAllUsers,
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updatePassword,
  updateUser,
  updateUserProfile,
} from "../controllers/authController.js";
import { authorizeRole, isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

router.route("/me").get(isAuthenticatedUser, getUserProfile);
router.route("/me/update").get(isAuthenticatedUser, updateUserProfile);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router
  .route("/admin/users")
  .put(isAuthenticatedUser, authorizeRole("admin"), getAllUsers);

router
  .route("/admin/users/:id")
  .put(isAuthenticatedUser, authorizeRole("admin"), updateUser)
  .delete(isAuthenticatedUser, authorizeRole("admin"), deleteUser);
export default router;
