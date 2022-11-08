import asyncHandler from "express-async-handler";
import User from "../models/users.js";
import Chef from "../models/chefs.js";
import generateToken from "../utils/generateToken.js";

const registerChef = asyncHandler(async (req, res) => {
  const { fullName, email, contactNo, address, password } = req.body;
  // console.log(req.body);
  const chefExists = await Chef.findOne({ email });
  if (chefExists) {
    res.status(400);
    throw new Error("Email already taken!");
  }
  //   const password = Math.random().toString(36).substring(2);
  const chef = await Chef.create({
    fullName,
    email,
    address,
    contactNo,
    password,
    image: `/uploads/file-1606697265286cool.jpg`,
    latitude: 27.232323,
    longitude: 87.787878,
    oneTimeAvailable: true,
    isActive: true,
    isVerified: true,
  });

  if (chef) {
    res.status(201).json({
      _id: chef._id,
      fullName: chef.fullName,
      email: chef.email,
      contactNo: chef.contactNo,
      shopContactNo: chef.shopContactNo,
      message: "Chef Request sent!",
      success: true,
    });
  } else {
    res.status(404);
    throw new Error("User can't be registered");
  }
});

const registerChefFormData = asyncHandler(async (req, res) => {
  const { fullName, email, contactNo, address, password, latitude, longitude } =
    req.body;
  // console.log(req.body);
  const image = req.files
    ? req.files[0].path
    : "uploads/file-1606697265286cool.jpg";
  const chefExists = await Chef.findOne({ email });
  if (chefExists) {
    res.status(400);
    throw new Error("Email already taken!");
  }
  //   const password = Math.random().toString(36).substring(2);
  const chef = await Chef.create({
    fullName,
    email,
    address,
    contactNo,
    password,
    image: "/" + image,
    latitude: latitude || 27.232323,
    longitude: longitude || 85.787878,
    oneTimeAvailable: true,
    isActive: true,
    isVerified: true,
  });

  if (chef) {
    res.status(201).json({
      _id: chef._id,
      fullName: chef.fullName,
      email: chef.email,
      contactNo: chef.contactNo,
      shopContactNo: chef.shopContactNo,
      message: "Chef Request sent!",
      success: true,
    });
  } else {
    res.status(404);
    throw new Error("User can't be registered");
  }
});

const updateChefVerification = asyncHandler(async (req, res) => {
  const chef = await Chef.findById(req.params.id);

  if (chef) {
    chef.isVerified = true;
    chef.isActive = true;
    chef.verifieddAt = Date.now();
    const updatedChef = await chef.save();
    res.json(updatedChef);
  } else {
    res.status(404);
    throw new Error("Order");
  }
});

const deactivateChef = asyncHandler(async (req, res) => {
  const chef = await Chef.findById(req.params.id);

  if (chef) {
    chef.isActive = false;
    const updatedChef = await Chef.save();
    res.json(updatedChef);
  } else {
    res.status(404);
    throw new Error("Order");
  }
});

const activateChef = asyncHandler(async (req, res) => {
  const chef = await Chef.findById(req.params.id);

  if (chef) {
    chef.isActive = true;
    const updatedChef = await Chef.save();
    res.json(updatedChef);
  } else {
    res.status(404);
    throw new Error("Order");
  }
});

const getVerifiedChefs = asyncHandler(async (req, res) => {
  const chefs = await Chef.find({ isVerified: true });
  res.json(chefs);
});

const getNonVerifiedChefs = asyncHandler(async (req, res) => {
  const chefs = await Chef.find({ isVerified: false });
  res.json(chefs);
});

const getActiveChefs = asyncHandler(async (req, res) => {
  const chefs = await Chef.find({ isVerified: true, isActive: true });
  res.json(chefs);
});

const getChefProfile = asyncHandler(async (req, res) => {
  const chef = await Chef.findById(req.chef);
  if (chef) {
    res.json({
      _id: chef._id,
      fullName: chef.fullName,
      shopName: chef.shopName,
      email: chef.email,
      contactNo: chef.contactNo,
      shopContactNo: chef.shopContactNo,
      shopEmail: chef.shopEmail,
      shopVatNo: chef.shopVatNo,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
  res.send("Success");
});

const updateChefProfile = asyncHandler(async (req, res) => {
  const {
    fullName,
    shopName,
    email,
    contactNo,
    shopContactNo,
    shopEmail,
    shopVatNo,
    chefId,
  } = req.body;

  const chef = await Chef.findById(chefId);
  if (chef) {
    chef.fullName = fullName || chef.fullName;
    chef.shopName = shopName || chef.shopName;
    chef.email = email || chef.email;
    chef.contactNo = contactNo || chef.contactNo;
    chef.shopContactNo = shopContactNo || chef.shopContactNo;
    chef.shopEmail = shopEmail || chef.shopEmail;
    chef.shopVatNo = shopVatNo || chef.shopVatNo;

    const updatedChef = await chef.save();

    res.json(updatedChef);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
  res.send("Success");
});

const getChef = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const chef = await Chef.findById(id);
  console.log(chef, id, "check");
  if (chef) {
    res.json({
      _id: chef._id,
      fullName: chef.fullName,
      shopName: chef.shopName,
      email: chef.email,
      contactNo: chef.contactNo,
      shopContactNo: chef.shopContactNo,
      shopEmail: chef.shopEmail,
      shopVatNo: chef.shopVatNo,
    });
  } else {
    res.status(201).json({
      message: "Not found!",
    });
  }
});

export {
  registerChef,
  registerChefFormData,
  updateChefVerification,
  deactivateChef,
  activateChef,
  getVerifiedChefs,
  getNonVerifiedChefs,
  getActiveChefs,
  getChefProfile,
  updateChefProfile,
  getChef,
};
