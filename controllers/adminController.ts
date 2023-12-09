import { Request, Response, NextFunction } from "express";
import { CreateVendorInput } from "../dto";
import { Vendor } from "../models";
import { GenerateSalt, GeneratePassword } from "../utility";

//Chore this to middleware
export const FindVendor = async (id: string | undefined, email?: string) => {
  if (email) {
    return await Vendor.findOne({ email: email });
  } else {
    return await Vendor.findById(id);
  }
};

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
  const exsistingVendor = await FindVendor("", email);
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
    password: userpassword,
    salt: salt,
    serviceAvaiLable: false,
    coverImage: [],
    rating: 0,
  });
  return res.json(createVendor);
};

export const GetVendors = async (req: Request, res: Response) => {
  const vendors = await Vendor.find();

  if (vendors !== null) {
    return res.json(vendors);
  }
  return res.json({ message: "vendor data not available" });
};

export const GetVendorByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const vendorID = req.params.id;
  const vendor = await FindVendor(vendorID);
  if (vendor !== null) {
    return res.json(vendor);
  }
  return res.json({ message: "vendor not found" });
};
