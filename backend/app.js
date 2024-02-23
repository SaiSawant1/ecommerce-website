import express from "express";
import dotenv from "dotenv";
const app = express();

dotenv.config({ path: "backend/config/config.env" });

//connecting to database
connectDatabase();

app.use(express.json());

// import all routes
import productRoutes from "./routes/product.js";
import { connectDatabase } from "./config/dbConnect.js";

app.use("/api/v1", productRoutes);

app.listen(process.env.PORT, () => {
  console.log(
    `Server Started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} `,
  );
});
