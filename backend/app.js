import express from "express";
import dotenv from "dotenv";
const app = express();

dotenv.config({ path: "backend/config/config.env" });

app.listen(3000, () => {
  console.log(`Server Started on Server 3000`);
});
