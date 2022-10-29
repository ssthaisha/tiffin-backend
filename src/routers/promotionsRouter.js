import express from "express";
// import path from 'path'
// import path from 'pa'
import {
  getPromotions,
  createPromotion,
} from "../controllers/promotionsController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";
// import upload from '../routers/uploadRouter.js'
import multer from "multer";
// import dotenv from 'dotenv';

// dotenv.config()

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/promotions");
  },
  filename: function(req, file, cb) {
    // console.log(file)
    cb(null, `${file.fieldname}-${+Date.now()+file.originalname}`);
  },
});

function checkFileType(file, cb){
  const filetypes =/jpg|jpeg|png/
  // const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  console.log(file, 'ff')
  if(mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }

}

const upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb) {

    checkFileType(file, cb)
  }
})

// const upload =multer({
//   dest: 'uploads/'
// })
// const router = express.Router();

// @desc Fetch all products
// @route GET /api/products
// @access Public route

// env: {
//   "PORT": 37021,
//   "NODE_ENV": "production"
// }

router.route("/").get(getPromotions).post(upload.array('file', 1), createPromotion);
// router.route('/:id/reviews').post(createProductReview)

// router.route('/verified').get(getVerifiedProducts)

// router.route('/nonverified').get(getNonVerifiedProducts)

// router.route('/active').get(getActiveproducts)

// router.route('/byvendor/:vendorId').get(getProductsByVendor)

// router
//   .route("/:id")
//   .get(getProductById)
//   .delete(protect, admin, deleteProduct)
//   .put(protect, admin, updateProduct);


  // router.route('/:id/verify').get(updateProductVerification);
  // router.route('/:id/deactivate').get(deactivateProduct);
  // router.route('/:id/activate').get(activateProduct);

  // @desc Fetch all products
// @route GET /api/products
// @access Public route

export default router;
