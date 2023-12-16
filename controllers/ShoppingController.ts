import express, { Response, Request, NextFunction } from "express";
import { Vendor } from "../models";

export const GetFoodAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pincode = req.params.pincode;

  const result = await Vendor.find({ pincode: pincode, serviceAvailable: true })
    .sort([["rating", "descending"]])
    .populate("foods");

  if (result.length > 0) {
    return res.status(200).json(result);
  }

  return res.status(404).json({ msg: "data Not found!" });
};
export const GetTopRestaurants = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
export const GetFoodsIn30Min = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
export const SearchFoods = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
export const GetAvailableOffers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
export const RestaurantById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
