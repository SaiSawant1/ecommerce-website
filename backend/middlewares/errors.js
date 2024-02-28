import ErrorHandler from "../utils/errorHandler.js";

export default (err, req, res, next) => {
  let error = {
    statusCode: err?.statusCode || 500,
    message: err?.message || "Internal Server Error",
  };

  //handle invalid Moongose ID Error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid ${err?.path}`;
    error = new ErrorHandler(message, 404);
  }

  //duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate Key.${Object.keys(err.keyValues)} entered`;
    error = new ErrorHandler(message, 404);
  }
  //handle validation error
  if (err.name === "ValidatorError") {
    const message = Object.values(err.errors).map((value) => value.message);
    error = new ErrorHandler(message, 404);
  }
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res
      .status(error.statusCode)
      .json({ message: error.message, error: err, stack: err?.stack });
  }
  if (process.env.NODE_ENV === "PRODUCTION") {
    res.status(error.statusCode).json({ message: error.message });
  }
};
