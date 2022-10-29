import asyncHandler from "express-async-handler";
import Category from "../models/categories.js";
import { developServer } from '../config/constants.js'

const createCategory = asyncHandler(async (req, res) => {
  // console.log( req.body, req.fields, req.files, req.file)
  const { name, thumbnail, parentCategory  } = req.body
  // const galleryImages = req.files.map(file => developServer + file.path)
  // const thumbnails = galleryImages.splice(0, 1);
  const category = new Category({
    name, thumbnail, parentCategory
  });

  const createdCategory = await category.save();
  if(createdCategory) {
    res.status(201).json(createdCategory);
  } else {
    res.status(201).json({ success: false, ...req.body })
  }
});

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});

  res.json(categories);
});

const updateCategory= asyncHandler(async (req, res) => {
  const {
    name,
    thumbnail,
    parentCategory
  } = req.body;

  const category = await Category.findById(req.params.id);

  if (category) {
    category.name = name;
    category.name = name;
    category.name = name;
    

    const updatedCategory = await category.save();
    res.status(201).json(updatedCategory);
    // category.price = price,
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

export {
  createCategory,
  getCategories
}