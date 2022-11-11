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
  registerDriverFormData,
} from "../controllers/driversController.js";
import { protect, admin, driver } from "../middlewares/authMiddleware.js";
import multer from "multer";
import { authUser } from "../controllers/userController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, `${file.fieldname}-${+Date.now() + file.originalname}`);
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  // const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype);

  console.log(file);
  if (mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// @desc Fetch all products
// @route GET /api/products
// @access Public route

router.route("/login").post(authUser);

router.route("/signup").post(registerDriver);

router
  .route("/web/signup")
  .post(upload.array("file", 1), registerDriverFormData);

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
