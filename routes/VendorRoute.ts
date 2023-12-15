import express, { Request, Response, NextFunction } from "express";
import {
  UpdateVendorProfile,
  VendorLogin,
  UpdateVendorService,
  GetVendorProfile,
  AddFood,
  UpdateVendorCoverImage,
} from "../controllers";
import { Authenticate } from "../middleware";
import multer from "multer";

const router = express.Router();

//multer setup
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + "_" + file.originalname);
  },
});

const images = multer({ storage: imageStorage }).array("images", 10);

router.post("/login", VendorLogin);

router.use(Authenticate);

router.get("/profile", Authenticate, GetVendorProfile);
router.patch("/profile", UpdateVendorProfile);
router.patch("/coverimage", images, UpdateVendorCoverImage);
router.patch("/service", UpdateVendorService);

//the food routes
router.post("/food", images, AddFood);
router.get("/foods");

export { router as vendorRoute };
