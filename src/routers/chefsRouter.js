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
  registerChefFormData,
} from "../controllers/chefsController.js";
import { updateChef } from "../controllers/userController.js";
import { protect, admin, chef } from "../middlewares/authMiddleware.js";
import multer from "multer";
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

router.route("/signup").post(registerChef);

router.route("/web/signup").post(upload.array("file", 1), registerChefFormData);

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
