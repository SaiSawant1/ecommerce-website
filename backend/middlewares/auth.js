import User from "../models/user.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "./catchAsyncError.js";
import jwt from "jsonwebtoken";

export const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req?.cookies;

  if (!token) {
    return next(new ErrorHandler("Unauthrized User. Please login first", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
});

export const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler("Unauthorized user. Premision denied", 403));
    }
    next();
  };
};
