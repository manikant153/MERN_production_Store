import express from "express";
import dotenv from "dotenv";

import path from "path";

import connecDB from "./config/db.js";

import productRoutes from "./route/productRoute.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json());

app.use("/api/products", productRoutes);

//If it's to production level then dist folder should be access
if (process.env.NODE_ENV === "production") {
  //To access the static file
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.use("/*splat", (res, req) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connecDB(); //setting up the database connection
  console.log(`Server started at http://localhost: ${PORT}`);
});
