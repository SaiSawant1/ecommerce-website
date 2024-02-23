import mongoose from "mongoose";
import Product from "../models/product.js";
import products from "../data/data.js";
import dotenv from "dotenv";
dotenv.config({ path: "backend/config/config.env" });

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    await Product.deleteMany();
    console.log("Products aree all deleted");
    await Product.insertMany(products);
    console.log("Products are inserted");
  } catch (error) {
    console.log(error.message);
  }
  process.exit();
};

seedProducts();
