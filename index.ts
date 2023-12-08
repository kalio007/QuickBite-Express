import express from "express";
import { adminRoute, vendorRoute } from "./routes";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { DB_URL } from "./config";
// require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/admin", adminRoute);
app.use("/vendor", vendorRoute);

//connecting DB
mongoose
  .connect(DB_URL)
  .then((result) => {
    console.log("connected");
  })
  .catch((err) => console.log(err));

app.listen(3000, () => {
  console.clear();
  console.log("listening");
});
