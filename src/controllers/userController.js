import asyncHandler from "express-async-handler";
import Chef from "../models/chefs.js";
import User from "../models/users.js";
import Driver from "../models/drivers.js";
import Vendor from "../models/vendors.js";
import generateToken from "../utils/generateToken.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, role, contactNo } = req.body;
  console.log(req.body);
  const isAdmin = false;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists!");
  }
  const user = await User.create({
    fullName,
    email,
    password,
    role,
    isAdmin,
    contactNo: "",
    address: "",
    // subscribeTo: null,
    subscriptionExpiryDate: "",
    // contactNo,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      isAdmin: user.isAdmin,
      subscribeTo: "",
      contactNo: "",
      address: "",
      subscriptionExpiryDate: null,
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
    const user = await User.findOne({ email: userName, isAdmin: true });

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
    console.log(
      customer,
      "test here \n >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> \n"
    );
    if (customer && customer.matchPassword(password)) {
      res.json({
        _id: customer._id,
        name: customer.name,
        email: customer.email,
        token: generateToken(customer._id),
        role: "CUSTOMER",
        success: true,
      });
    } else {
      res.status(401);
      throw new Error(`Invalid email or password +${email}`);
    }
  } else if (userRole === "CHEF") {
    const chef = await Chef.findOne({ email: userName });
    console.log(chef, chef.password, password, "chefff");
    if (chef && chef.password === password) {
      console.log(chef, "\n >>>>>> tesssst ");
      res.json({
        _id: chef._id,
        fullName: chef.fullName,
        image: chef.image,
        address: chef.address,
        contactNo: chef.contactNo,
        email: chef.email,
        oneTimeAvailable: chef.oneTimeAvailable,
        bio: chef.bio,
        token: generateToken(chef._id),
        role: "CHEF",
        success: true,
      });
    } else {
      res.status(401);
      throw new Error(`Invalid email or password +${email}`);
    }
  } else if (userRole === "DRIVER") {
    const driver = await Driver.findOne({ email: userName });
    if (driver && driver.password === password) {
      res.json({
        _id: driver._id,
        fullName: driver.fullName,
        token: generateToken(driver._id),
        role: "DRIVER",
        success: true,
      });
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

const subscribeTo = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  console.log(req.params, "\n >>>>>> \n check params");
  if (user) {
    user.subscribedTo = req.params.chefId || user.subscribedTo;
    user.subscriptionExpiryDate =
      new Date("2023-01-01") || user.subscriptionExpiryDate;
    // user.fullName = "abcd";
    // user.name = "Aaayuu";

    // user.subscriptionExpiryDate = moment(u)
    const updatedUser = await user.save();
    console.log(updatedUser, req.params, "params");
    res.json({
      message: "Subscribed!!",
      user: updatedUser,
    });
  } else {
    res.status(401);
    throw new Error(`User not Found`);
  }
});

const getSubscribers = asyncHandler(async (req, res) => {
  const users = await User.find({ subscribedTo: req.params.chefId }).select(
    "email fullName address subscribedTo contactNo subscriptionExpiryDate"
  );
  console.log(req.params, users, "\n >>>>>> \n check params");
  if (users) {
    res.json(users);
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
  subscribeTo,
  getSubscribers,
};
