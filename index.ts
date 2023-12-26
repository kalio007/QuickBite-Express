import express from "express";
import {
  ShoppingRoute,
  adminRoute,
  vendorRoute,
  CustomerRoute,
} from "./routes";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { DB_URL } from "./config";
import path from "path";
// require("dotenv").config();

const app = express();

//multer global setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/admin", adminRoute);
app.use("/vendor", vendorRoute);
app.use("/shopping", ShoppingRoute);
app.use("/customer", CustomerRoute);

//connecting DB
mongoose
  .connect(DB_URL)
  .then((result) => {
    console.log("connected");
  })
  .catch((err) => console.log(err));

app.listen(8080, () => {
  console.clear();
  console.log("listening");
});
