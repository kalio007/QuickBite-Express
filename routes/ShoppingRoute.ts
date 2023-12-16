import express from "express";
import {
  GetAvailableOffers,
  GetFoodAvailability,
  GetTopRestaurants,
  GetFoodsIn30Min,
  SearchFoods,
  RestaurantById,
} from "../controllers";

const router = express.Router();

//food Availability
router.get("/:pincode", GetFoodAvailability);
//top restaurant
router.get("/top-restaurant/:pincode", GetTopRestaurants);

router.get("/foods-in-30-min/:pincode", GetFoodsIn30Min);

router.get("/search/:pincode", SearchFoods);

router.get("/offers/:pincode", GetAvailableOffers);

router.get("/restaurant/:id", RestaurantById);

export { router as ShoppingRoute };
