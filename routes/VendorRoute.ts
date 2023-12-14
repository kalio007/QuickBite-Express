import express, { Request, Response, NextFunction } from "express";
import {
  UpdateVendorProfile,
  VendorLogin,
  UpdateVendorService,
  GetVendorProfile,
  AddFood,
} from "../controllers";
import { Authenticate } from "../middleware";

const router = express.Router();
router.post("/login", VendorLogin);

router.use(Authenticate);

router.get("/profile", Authenticate, GetVendorProfile);
router.patch("/profile", UpdateVendorProfile);
router.patch("/service", UpdateVendorService);

//the food routes
router.post("/food", AddFood);
router.get("/foods");

export { router as vendorRoute };
