import { Request, Response, NextFunction } from "express";
import { CreateVendorInput } from "../dto";

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
  return res.json({ name });
};
export const GetVendor = async (req: Request, res: Response) => {
  return res.send("hello");
};
export const GetVendorByID = async (req: Request, res: Response) => {};
