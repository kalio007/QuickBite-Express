import express, { Request, Response, NextFunction } from "express";
import {
  CreateVendor,
  GetVendor,
  GetVendorByID,
} from "../controllers/adminController";

const router = express.Router();
router.post("/", CreateVendor);
router.get("/vendors", GetVendor);
router.get("/vendor:id", GetVendorByID);

export { router as adminRoute };
