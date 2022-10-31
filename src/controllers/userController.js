import asyncHandler from "express-async-handler";
import User from "../models/users.js";
import Vendor from "../models/vendors.js";
import generateToken from "../utils/generateToken.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  console.log(req.body);
  const isAdmin = false;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists!");
  }
  const user = await User.create({
    name,
    email,
    password,
    role,
    isAdmin,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("User can't be registered");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, email, password, isAdmin, userId } = req.body;
  console.log(req.body);
  const user = await User.findById(userId);
  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    if (password) {
      user.password = password;
    }

    const updatedUser = await user.save();
    console.log(updatedUser);
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
  // res.send("Success");
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
  res.send("Success");
});

const authUser = asyncHandler(async (req, res) => {
  // console.log(req)
  const { userName, email, password, userRole } = req.body;

  console.log(req.body, "check login details");

  if (userRole === "ADMIN") {
    const user = await User.findOne({ email: userName });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        success: true,
      });
    } else {
      res.status(401);
      throw new Error(`Invalid email or password +${email}`);
    }
  } else if (userRole === "CUSTOMER") {
    const customer = await User.findOne({ email: userName });
    console.log(customer, 'test here \n >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> \n');
    if (customer && customer.matchPassword(password)) {
      res.json({
        _id: customer._id,
        name: customer.name,
        token: generateToken(customer._id),
        success: true,
      });
    } else {
      res.status(401);
      throw new Error(`Invalid email or password +${email}`);
    }
  } else {
    res.status(401);
    throw new Error(`Invalid email or password +${email}`);
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({
      message: "User removed!",
    });
  } else {
    res.status(401);
    throw new Error(`User not Found`);
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json({
      user,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
  res.send("Success");
});

const updateUser = asyncHandler(async (req, res) => {
  const { name, email, password, isAdmin, userId } = req.body;

  const user = await User.findById(userId);
  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    user.isAdmin = isAdmin || user.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
  res.send("Success");
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  updateUser,
  getUserById,
};
