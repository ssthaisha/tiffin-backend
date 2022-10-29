import asyncHandler from "express-async-handler";
import Product from "../models/products.js";
import { developServer } from "../config/constants.js";

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const createProduct = asyncHandler(async (req, res) => {
  // console.log( req.body, req.fields, req.files, req.file)
  const {
    productName,
    price,
    discount,
    countInStock,
    brand,
    category,
    description,
    vendor,
  } = req.body;
  const galleryImages = req.files.map((file) => developServer + file.path);
  const thumbnails = galleryImages.splice(0, 1);
  const product = new Product({
    productName,
    price,
    thumbnail: thumbnails[0],
    galleryImages,
    brand,
    category,
    discount,
    countInStock,
    description,
    isVerified: false,
    isActive: false,
    isVendorActive: true,
    vendor,
  });

  const createdProduct = await product.save();
  if (createdProduct) {
    res.status(201).json(createdProduct);
  } else {
    res.status(201).json({ success: false, ...req.body });
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
    // product.price = price,
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({
      message: "Product removed",
    });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = products.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
  } else {
    res.status(404);
    throw new Erro("Product not found!");
  }
});

const updateProductVerification = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    product.isVerified = true;
    product.isActive = true;
    product.verifieddAt = Date.now();
    const updatedproduct = await product.save();
    res.json(updatedproduct);
  } else {
    res.status(404);
    throw new Error("Order");
  }
});

const deactivateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    product.isActive = false;
    const updatedproduct = await product.save();
    res.json(updatedproduct);
  } else {
    res.status(404);
    throw new Error("Order");
  }
});

const activateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    product.isActive = true;
    const updatedproduct = await product.save();
    res.json(updatedproduct);
  } else {
    res.status(404);
    throw new Error("Order");
  }
});

const getVerifiedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ isVerified: true });
  res.json(products);
});

const getNonVerifiedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ isVerified: false });
  res.json(products);
});

const getActiveproducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ isVerified: true, isActive: true });
  res.json(products);
});

const getProductsByVendor = asyncHandler(async (req, res) => {
  const products = await Product.find({ vendor: req.params.vendorId });
  res.json(products);
});

const getProductsByCategory = asyncHandler(async (req, res) => {
  const products = Product.find({ category: { _id: req.categoryId } });
  res.json(products);
});

const getProductsSearchByName = asyncHandler(async (req, res) => {
  // const products = Product.find({ productName: })

  const searchName = req.params.productName;
  console.log(searchName, "\n >>>>>>>> \n");
  const query = {
    productName: { $regex: new RegExp(searchName, "g"), $options: "i" },
  };
  Product.find(query, function (err, found) {
    //Do yo
    if (err) {
      res.status(401).json(err);
      console.log("errrrrr");
    } else {
      console.log(found, "found");
      res.status(201).json(found);
    }
  });
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  updateProductVerification,
  deactivateProduct,
  activateProduct,
  getVerifiedProducts,
  getNonVerifiedProducts,
  getActiveproducts,
  getProductsByVendor,
  getProductsSearchByName,
  getProductsByCategory,
};
