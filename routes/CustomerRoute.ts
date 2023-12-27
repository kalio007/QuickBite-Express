import express, { Request, Response, NextFunction } from "express";
// import { AddToCart, CreateOrder, CreatePayment, CustomerLogin, CustomerSignUp, CustomerVerify, DeleteCart, EditCustomerProfile, GetCart, GetCustomerProfile, GetOrderById, GetOrders, RequestOtp, VerifyOffer } from '../controllers';
const router = express.Router();
import { Authenticate } from "../middleware";
import { Offer } from "../models/Offers";

export { router as CustomerRoute };
