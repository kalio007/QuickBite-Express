import { Request, Response, NextFunction } from "express";
import { AuthPayload } from "../dto";
import { ValidateSignature } from "../utility";

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export const Authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const signature = await ValidateSignature(req);
  if (signature) {
    next();
  } else {
    return res.json({ message: "user not Authorised" });
  }
};
