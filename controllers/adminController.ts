import { Request, Response, NextFunction } from "express";
import { CreateVendorInput } from "../dto";
import { Vendor } from "../models";
import { GenerateSalt, GeneratePassword } from "../utility";

export const CreateVendor = async (req: Request, res: Response) => {
  const {
    name,
    ownerName,
    foodType,
    pinCode,
    address,
    phone,
    email,
    password,
  } = <CreateVendorInput>req.body;
  const exsistingVendor = await Vendor.findOne({ email: email });
  if (exsistingVendor !== null) {
    return res.json({ message: "User already exsist" });
  }
  const salt = await GenerateSalt();
  const userpassword = await GeneratePassword(password, salt);
  const createVendor = await Vendor.create({
    name: name,
    ownerName: ownerName,
    foodType: foodType,
    pinCode: pinCode,
    address: address,
    phone: phone,
    email: email,
    password: password,
    salt: "12aklem",
    serviceAvaiLable: false,
    coverImage: [],
    rating: 0,
  });
  return res.json(createVendor);
};

export const GetVendor = async (req: Request, res: Response) => {
  return res.send("hello");
};

export const GetVendorByID = async (req: Request, res: Response) => {};
