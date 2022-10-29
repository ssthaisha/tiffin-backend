import asyncHandler from "express-async-handler";
import Promotion from "../models/promotions.js";
import { developServer } from '../config/constants.js'

const createPromotion = asyncHandler(async (req, res) => {
  // console.log( req.body, req.fields, req.files, req.file)
  const { name  } = req.body
  const images = req.files.map(file => developServer + file.path ).slice(0, 1);
  const imagez = images.splice(0,1);
  const promotion = new Promotion({
    name, image: imagez[0]
  });

  const createdPromotion = await promotion.save();
  if(createdPromotion) {
    res.status(201).json(createdPromotion);
} else {
    res.status(201).json({ success: false, ...req.body })
  }
});

const getPromotions = asyncHandler(async (req, res) => {
  const promotions = await Promotion.find({});

  res.json(promotions);
});

const updatePromotion = asyncHandler(async (req, res) => {
  const {
    name,
    image

  } = req.body;

  const promotion = await Promotion.findById(req.params.id);

  if (promotion) {
    promotion.name = name;
    promotion.name = name;
    promotion.name = name;
    

    const updatedPromotion = await promotion.save();
    res.status(201).json(updatedPromotion);
    // promotion.price = price,
  } else {
    res.status(404);
    throw new Error("Promotion not found");
  }
});

export {
  createPromotion,
  getPromotions,
}