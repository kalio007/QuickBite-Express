import express, { Request, Response, NextFunction } from "express";
export * from "./adminController";
import { app } from "../index";
import request from "supertest";
import { Vendor } from "../models";

jest.mock("../models/vendor");
const mockVendors = [
  {
    name: "Vendor1",
    ownerName: "Owner1",
    foodType: ["Type1"],
    pinCode: "12345",
    address: "Address1",
    phone: "1234567890",
    email: "vendor1@example.com",
    password: "password1",
    salt: "salt1",
    serviceAvailable: true,
    coverImages: ["image1.jpg"],
    rating: 4.5,
    foods: [],
  },
];
//to populate the databse with mock data
beforeAll(async () => {
  await Vendor.deleteMany(); // Clear existing data
  await Vendor.create(mockVendors);
});

describe("GET /vendors", () => {
  it("should get a list of vendors", async () => {
    const response = await request(app).get("/vendors");
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(mockVendors.length);
  });
});
