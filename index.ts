import express from "express";
import { adminRoute, vendorRoute } from "./routes";

const app = express();
app.use("/admin", adminRoute);
app.use("/vendor", vendorRoute);

app.listen(3000, () => {
  console.clear();
  console.log("listening");
});
