import { Request, Response, NextFunction } from "express";
import { VendorLoginInput } from "../dto";
import { FindVendor } from "./adminController";
import { GenerateSignature, validatePassword } from "../utility";

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
) => {};

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
