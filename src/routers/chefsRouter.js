import express from "express";
import {
  registerChef,
  updateChefVerification,
  deactivateChef,
  activateChef,
  getVerifiedChefs,
  getNonVerifiedChefs,
  getActiveChefs,
  getChefProfile,
  updateChefProfile,
  getChef,
} from "../controllers/chefsController.js";
import { updateChef } from "../controllers/userController.js";
import { protect, admin, chef } from "../middlewares/authMiddleware.js";
const router = express.Router();

// @desc Fetch all products
// @route GET /api/products
// @access Public route

router.route("/signup").post(registerChef);

router.route("/verified").get(getVerifiedChefs);

router.route("/nonverified").get(getNonVerifiedChefs);

router.route("/active").get(getActiveChefs);

// router.post("/login", authUser);

// router.route("/profile").get(chef, getChefProfile).put(chef, updateChefProfile);
// .delete(protect, admin, deleteUser);
// router.route('/:id').get(getProductById)

// router
//   .route('/:id')
//   .put(protect, admin, updateUser)
//   .get(protect, admin, getUserById)
//   .delete(protect, admin, deleteUser)
router.route("/:id").get(getChef);

router.route("/:id/update").post(updateChef);

router.route("/:id/verify").get(protect, admin, updateChefVerification);
router.route("/:id/deactivate").get(protect, admin, deactivateChef);
router.route("/:id/activate").get(protect, admin, activateChef);
// @desc Fetch all products
// @route GET /api/products
// @access Public route

module.exports = router;
