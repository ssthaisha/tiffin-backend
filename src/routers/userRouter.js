import express from "express";
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  deleteUser,
  updateUser,
  getUserById,
  getUsers,
} from "../controllers/userController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";
const router = express.Router();

// @desc Fetch all products
// @route GET /api/products
// @access Public route

router.route("/signup").post(registerUser);

router.route("/users").get(getUsers);

router.post("/login", authUser);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
  .delete(protect, admin, deleteUser);
// router.route('/:id').get(getProductById)

router
  .route("/:id")
  .put(updateUser)
  .get(protect, admin, getUserById)
  .delete(protect, admin, deleteUser);
// @desc Fetch all products
// @route GET /api/products
// @access Public route

module.exports = router;
