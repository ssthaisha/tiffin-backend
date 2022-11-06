import express from "express";
import {
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
} from "../controllers/driversController.js";
import { protect, admin, driver } from "../middlewares/authMiddleware.js";
const router = express.Router();

// @desc Fetch all products
// @route GET /api/products
// @access Public route

router.route("/signup").post(registerDriver);

router.route("/verified").get(getVerifiedDrivers);

router.route("/nonverified").get(getNonVerifiedDrivers);

router.route("/active").get(getActiveDrivers);

// router.post("/login", authUser);

// router
//   .route("/profile")
//   .get(driver, getDriverProfile)
//   .put(driver, updateDriverProfile);
// .delete(protect, admin, deleteUser);
// router.route('/:id').get(getProductById)

// router
//   .route('/:id')
//   .put(protect, admin, updateUser)
//   .get(protect, admin, getUserById)
//   .delete(protect, admin, deleteUser)
router.route("/:id").get(getDriver);

router.route("/:id/verify").get(protect, admin, updateDriverVerification);
router.route("/:id/deactivate").get(protect, admin, deactivateDriver);
router.route("/:id/activate").get(protect, admin, activateDriver);
// @desc Fetch all products
// @route GET /api/products
// @access Public route

module.exports = router;
