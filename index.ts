import express from "express";
import { adminRoute, vendorRoute } from "./routes";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/admin", adminRoute);
app.use("/vendor", vendorRoute);

app.listen(3000, () => {
  console.clear();
  console.log("listening");
});
