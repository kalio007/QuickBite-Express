import { Request, Response, NextFunction } from "express";
import { EditVendorInput, VendorLoginInput } from "../dto";
import { FindVendor } from "./adminController";
import { GenerateSignature, validatePassword } from "../utility";
import { CreateFoodInput } from "../dto";
import { Food } from "../models";
import { Multer } from "multer";

export const VendorLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = <VendorLoginInput>req.body;
  const exsistingVendor = await FindVendor("", email);
  if (exsistingVendor !== null) {
    // validate and give access
    const validation = await validatePassword(
      password,
      exsistingVendor.password,
      exsistingVendor.salt
    );
    if (validation) {
      const signature = GenerateSignature({
        _id: exsistingVendor._id,
        email: exsistingVendor.email,
        name: exsistingVendor.name,
      });
      return res.json(signature);
    } else {
      return res.json({ message: "Passsword not valid" });
    }
  }
  return res.json({ message: "Login credentail not valid" });
};

export const GetVendorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  if (user) {
    const existingVendor = await FindVendor(user._id);
    return res.json(existingVendor);
  }

  return res.json({ message: "vendor Information Not Found" });
};

export const UpdateVendorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, address, phone, foodType } = <EditVendorInput>req.body;
  const user = req.user;

  if (user) {
    const existingVendor = await FindVendor(user._id);
    if (existingVendor) {
      existingVendor.name = name;
      existingVendor.address;
      existingVendor.phone = phone;
      existingVendor.foodType = foodType;
      const updatedProfile = await existingVendor.save();
      return res.json(updatedProfile);
    }
  }
};

export const UpdateVendorCoverImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
export const UpdateVendorService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
export const AddFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  const { name, description, category, foodType, readyTime, price } = <
    CreateFoodInput
  >req.body;

  if (user) {
    const vendor = await FindVendor(user._id);

    if (vendor !== null) {
      const files = req.files as [Express.Multer.File];

      const images = files.map((file: Express.Multer.File) => file.filename);

      const food = await Food.create({
        vendorId: vendor._id, //this is the real link between the two tables
        name: name,
        description: description,
        category: category,
        price: price,
        rating: 0,
        readyTime: readyTime,
        foodType: foodType,
        images: images,
      });

      vendor.foods.push(food);
      const result = await vendor.save();
      return res.json(result);
    }
  }
  return res.json({ message: "Unable to Update vendor profile " });
};
export const GetFoods = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  if (user) {
    const foods = await Food.find({ vendorId: user._id });

    if (foods !== null) {
      return res.json(foods);
    }
  }
  return res.json({ message: "Foods not found!" });
};
