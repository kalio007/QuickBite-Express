import express, { Request, Response, NextFunction } from "express";
import {
  UpdateVendorProfile,
  VendorLogin,
  UpdateVendorService,
} from "../controllers";

const router = express.Router();

router.post("/login", VendorLogin);
router.patch("/profile", UpdateVendorProfile);
router.patch("/service", UpdateVendorService);

export { router as vendorRoute };
