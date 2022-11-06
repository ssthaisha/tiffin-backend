import express from "express";
import {
  registerVendor,
  updateVendorVerification,
  deactivateVendor,
  activateVendor,
  getVerifiedVendors,
  getNonVerifiedVendors,
  getActiveVendors,
  getVendorProfile,
  updateVendorProfile,
  getVendor,
} from "../controllers/vendorController.js";
import { protect, admin, vendor } from "../middlewares/authMiddleware.js";
const router = express.Router();

// @desc Fetch all products
// @route GET /api/products
// @access Public route

router.route("/signup").post(registerVendor);

router.route("/verified").get(getVerifiedVendors);

router.route("/nonverified").get(getNonVerifiedVendors);

router.route("/active").get(getActiveVendors);

// router.post("/login", authUser);

router
  .route("/profile")
  .get(vendor, getVendorProfile)
  .put(vendor, updateVendorProfile);
// .delete(protect, admin, deleteUser);
// router.route('/:id').get(getProductById)

// router
//   .route('/:id')
//   .put(protect, admin, updateUser)
//   .get(protect, admin, getUserById)
//   .delete(protect, admin, deleteUser)
router.route("/:id").get(getVendor);

router.route("/:id/verify").get(protect, admin, updateVendorVerification);
router.route("/:id/deactivate").get(protect, admin, deactivateVendor);
router.route("/:id/activate").get(protect, admin, activateVendor);
// @desc Fetch all products
// @route GET /api/products
// @access Public route

module.exports = router;
