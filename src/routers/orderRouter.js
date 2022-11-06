import express from "express";
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getOrders,
  getMyOrders,
  updateOrderToDelivered,
  getOrdersByVendor,
} from "../controllers/orderController.js";
import { protect, admin, vendor } from "../middlewares/authMiddleware.js";
const router = express.Router();

// @desc Fetch all products
// @route GET /api/products
// @access Public route

router.route("/").post(addOrderItems).get(protect, admin, getOrders);

router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);
// @desc Fetch all products
// @route GET /api/products
// @access Public route
router.route("/byvendor/:vendorId").get(vendor, getOrdersByVendor);

module.exports = router;
