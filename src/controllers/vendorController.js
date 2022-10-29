import asyncHandler from "express-async-handler";
import User from "../models/users.js";
import Vendor from "../models/vendors.js";
import generateToken from "../utils/generateToken.js";

const registerVendor = asyncHandler(async (req, res) => {
  const {
    fullName,
    shopName,
    email,
    contactNo,
    shopContactNo,
    shopEmail,
    shopVatNo,
  } = req.body;
  // console.log(req.body);
  const vendorExists = await Vendor.findOne({ email });
  if (vendorExists) {
    res.status(400);
    throw new Error("Email already taken!");
  }
  const password = Math.random().toString(36).substring(2);
  const vendor = await Vendor.create({
    fullName,
    shopName,
    email,
    contactNo,
    shopContactNo,
    shopEmail,
    shopVatNo,
    password,
    isActive: false,
    isVerified: false,
  });

  if (vendor) {
    res.status(201).json({
      _id: vendor._id,
      fullName: vendor.fullName,
      shopName: vendor.shopName,
      email: vendor.email,
      contactNo: vendor.contactNo,
      shopContactNo: vendor.shopContactNo,
      shopEmail: vendor.shopEmail,
      shopVatNo: vendor.shopVatNo,
      message: 'Vedor Request sent!',
      success: true,
    });
  } else {
    res.status(404);
    throw new Error("User can't be registered");
  }
});

const updateVendorVerification = asyncHandler(async (req, res) => {
  const vendor = await Vendor.findById(req.params.id);

  if (vendor) {
    vendor.isVerified = true;
    vendor.isActive = true;
    vendor.verifieddAt = Date.now();
    const updatedVendor = await vendor.save();
    res.json(updatedVendor);
  } else {
    res.status(404);
    throw new Error("Order");
  }
});

const deactivateVendor = asyncHandler(async (req, res) => {
  const vendor = await Vendor.findById(req.params.id);

  if (vendor) {
    vendor.isActive = false;
    const updatedVendor = await Vendor.save();
    res.json(updatedVendor);
  } else {
    res.status(404);
    throw new Error("Order");
  }
});

const activateVendor = asyncHandler(async (req, res) => {
  const vendor = await Vendor.findById(req.params.id);

  if (vendor) {
    vendor.isActive = true;
    const updatedVendor = await Vendor.save();
    res.json(updatedVendor);
  } else {
    res.status(404);
    throw new Error("Order");
  }
});

const getVerifiedVendors = asyncHandler(async (req, res) => {
  const vendors = await Vendor.find({ isVerified: true });
  res.json(vendors);
});

const getNonVerifiedVendors = asyncHandler(async (req, res) => {
  const vendors = await Vendor.find({ isVerified: false });
  res.json(vendors);
});

const getActiveVendors = asyncHandler(async (req, res) => {
  const vendors = await Vendor.find({ isVerified: true, isActive: true });
  res.json(vendors);
});

const getVendorProfile = asyncHandler(async (req, res) => {
  const vendor = await Vendor.findById(req.vendor);
  if (vendor) {
    res.json({
      _id: vendor._id,
      fullName: vendor.fullName,
      shopName: vendor.shopName,
      email: vendor.email,
      contactNo: vendor.contactNo,
      shopContactNo: vendor.shopContactNo,
      shopEmail: vendor.shopEmail,
      shopVatNo: vendor.shopVatNo,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
  res.send("Success");
});

const updateVendorProfile = asyncHandler(async (req, res) => {
  const { 
    fullName,
    shopName,
    email,
    contactNo,
    shopContactNo,
    shopEmail,
    shopVatNo, 
  vendorId } = req.body;

  const vendor = await Vendor.findById(vendorId);
  if (vendor) {
    vendor.fullName = fullName || vendor.fullName;
    vendor.shopName = shopName || vendor.shopName;
    vendor.email = email || vendor.email;
    vendor.contactNo = contactNo || vendor.contactNo;
    vendor.shopContactNo = shopContactNo || vendor.shopContactNo;
    vendor.shopEmail = shopEmail || vendor.shopEmail;
    vendor.shopVatNo = shopVatNo || vendor.shopVatNo;

    const updatedVendor = await vendor.save();

    res.json(updatedVendor);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
  res.send("Success");
});

const getVendor = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const vendor = await Vendor.findById(id);
  console.log(vendor, id, 'check')
  if(vendor) {
    res.json({
      _id: vendor._id,
      fullName: vendor.fullName,
      shopName: vendor.shopName,
      email: vendor.email,
      contactNo: vendor.contactNo,
      shopContactNo: vendor.shopContactNo,
      shopEmail: vendor.shopEmail,
      shopVatNo: vendor.shopVatNo,
    });   
  }
  else {
    res.status(201).json({
      message: 'Not found!'
    })
  }
});

export {
  registerVendor,
  updateVendorVerification,
  deactivateVendor,
  activateVendor,
  getVerifiedVendors,
  getNonVerifiedVendors,
  getActiveVendors,
  getVendorProfile,
  updateVendorProfile,
  getVendor
}