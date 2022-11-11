import asyncHandler from "express-async-handler";
import User from "../models/users.js";
import Driver from "../models/drivers.js";
import generateToken from "../utils/generateToken.js";

const registerDriver = asyncHandler(async (req, res) => {
  const { fullName, email, contactNo, address, password } = req.body;
  // console.log(req.body);
  const driverExists = await Driver.findOne({ email });
  if (driverExists) {
    res.status(400);
    throw new Error("Email already taken!");
  }
  //   const password = Math.random().toString(36).substring(2);
  const driver = await Driver.create({
    fullName,
    email,
    address,
    contactNo,
    password,
    isActive: true,
    isVerified: true,
  });

  if (driver) {
    res.status(201).json({
      _id: driver._id,
      fullName: driver.fullName,
      email: driver.email,
      contactNo: driver.contactNo,
      shopContactNo: driver.shopContactNo,
      message: "Driver Request sent!",
      success: true,
    });
  } else {
    res.status(404);
    throw new Error("User can't be registered");
  }
});

const registerDriverFormData = asyncHandler(async (req, res) => {
  const { fullName, contactNo, address, password } = req.body;
  // console.log(req.body);
  const image = req.files
    ? req.files[0].path
    : "uploads/file-1606697265286cool.jpg";
  const driverExists = await Driver.findOne({ contactNo });
  if (driverExists) {
    res.status(400);
    throw new Error("Number already taken!");
  }
  //   const password = Math.random().toString(36).substring(2);
  const driver = await Driver.create({
    fullName,
    address,
    contactNo,
    email: contactNo,
    password,
    image: "/" + image,
    isActive: true,
    isVerified: true,
  });

  if (driver) {
    res.status(201).json({
      _id: driver._id,
      fullName: driver.fullName,
      contactNo: driver.contactNo,
      message: "Driver Request sent!",
      success: true,
    });
  } else {
    res.status(404);
    throw new Error("User can't be registered");
  }
});

const updateDriverVerification = asyncHandler(async (req, res) => {
  const driver = await Driver.findById(req.params.id);

  if (driver) {
    driver.isVerified = true;
    driver.isActive = true;
    driver.verifieddAt = Date.now();
    const updatedDriver = await driver.save();
    res.json(updatedDriver);
  } else {
    res.status(404);
    throw new Error("Order");
  }
});

const deactivateDriver = asyncHandler(async (req, res) => {
  const driver = await Driver.findById(req.params.id);

  if (driver) {
    driver.isActive = false;
    const updatedDriver = await Driver.save();
    res.json(updatedDriver);
  } else {
    res.status(404);
    throw new Error("Order");
  }
});

const activateDriver = asyncHandler(async (req, res) => {
  const driver = await Driver.findById(req.params.id);

  if (driver) {
    driver.isActive = true;
    const updatedDriver = await Driver.save();
    res.json(updatedDriver);
  } else {
    res.status(404);
    throw new Error("Order");
  }
});

const getVerifiedDrivers = asyncHandler(async (req, res) => {
  const drivers = await Driver.find({ isVerified: true });
  res.json(drivers);
});

const getNonVerifiedDrivers = asyncHandler(async (req, res) => {
  const drivers = await Driver.find({ isVerified: false });
  res.json(drivers);
});

const getActiveDrivers = asyncHandler(async (req, res) => {
  const drivers = await Driver.find({ isVerified: true, isActive: true });
  console.log(drivers, "testt");
  res.json(drivers);
});

const getDriverProfile = asyncHandler(async (req, res) => {
  const driver = await Driver.findById(req.driver);
  if (driver) {
    res.json({
      _id: driver._id,
      fullName: driver.fullName,
      shopName: driver.shopName,
      email: driver.email,
      contactNo: driver.contactNo,
      shopContactNo: driver.shopContactNo,
      shopEmail: driver.shopEmail,
      shopVatNo: driver.shopVatNo,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
  res.send("Success");
});

const updateDriverProfile = asyncHandler(async (req, res) => {
  const {
    fullName,
    shopName,
    email,
    contactNo,
    shopContactNo,
    shopEmail,
    shopVatNo,
    driverId,
  } = req.body;

  const driver = await Driver.findById(driverId);
  if (driver) {
    driver.fullName = fullName || driver.fullName;
    driver.shopName = shopName || driver.shopName;
    driver.email = email || driver.email;
    driver.contactNo = contactNo || driver.contactNo;
    driver.shopContactNo = shopContactNo || driver.shopContactNo;
    driver.shopEmail = shopEmail || driver.shopEmail;
    driver.shopVatNo = shopVatNo || driver.shopVatNo;

    const updatedDriver = await driver.save();

    res.json(updatedDriver);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
  res.send("Success");
});

const getDriver = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const driver = await Driver.findById(id);
  console.log(driver, id, "check");
  if (driver) {
    res.json({
      _id: driver._id,
      fullName: driver.fullName,
      shopName: driver.shopName,
      email: driver.email,
      contactNo: driver.contactNo,
      shopContactNo: driver.shopContactNo,
      shopEmail: driver.shopEmail,
      shopVatNo: driver.shopVatNo,
    });
  } else {
    res.status(201).json({
      message: "Not found!",
    });
  }
});

export {
  registerDriver,
  updateDriverVerification,
  deactivateDriver,
  activateDriver,
  getVerifiedDrivers,
  getNonVerifiedDrivers,
  getActiveDrivers,
  getDriverProfile,
  updateDriverProfile,
  getDriver,
  registerDriverFormData,
};
