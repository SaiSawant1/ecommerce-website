import express from "express";
import dotenv from "dotenv";
import errorMiddleware from "./middlewares/errors.js";
const app = express();

//handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err}`);
  console.log("shutting down due to uncaught exception");
  process.exit(1);
});

dotenv.config({ path: "backend/config/config.env" });

//connecting to database
connectDatabase();

app.use(express.json());

// import all routes
import productRoutes from "./routes/product.js";
import { connectDatabase } from "./config/dbConnect.js";

app.use("/api/v1", productRoutes);

app.use(errorMiddleware);

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server Started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} `,
  );
});

//handler unhandled Promise rejection

process.on("unhandledRejection", (err) => {
  console.log(`ERROR:${err}`);
  console.log("Shutting down the server due to to Unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
