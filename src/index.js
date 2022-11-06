import { connectDB } from "./db.js";
import path from "path";
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import formidable from "express-formidable";

import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
import orderRouter from "./routers/orderRouter.js";
import vendorRouter from "./routers/vendorRouter.js";
import categoryRouter from "./routers/categoriesRouter.js";
import promotionRouter from "./routers/promotionsRouter.js";
import driversRouter from "./routers/driversRouter";
import chefsRouter from "./routers/chefsRouter";
import uploadRouter from "./routers/uploadRouter.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHanders.js";
import subscriberRouter from "./routers/subscriptionRouter";
// const express = require('express')
const app = express();
// const connectDB = require('./db')

// const dotenv = require('dotenv')

dotenv.config();

connectDB();

// app.use(formidable())

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(helmet());
app.use(cors());
// app.use(express.json())

app.get("/", (req, res) => {
  res.send("API is running fine Check it!!!...");
});

app.use("/api/products", productRouter);
app.use("/api/chefs", chefsRouter);
app.use("/api/drivers", driversRouter);
app.use("/api/auth", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/vendors", vendorRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/promotions", promotionRouter);
// app.use('/api/upload', uploadRouter)
app.use("/api/subscribe", subscriberRouter);

const __dirname = path.resolve();
console.log(path.join(__dirname, "/uploads"));
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
// app.get('/:', (req, res) => {
//   res.send('API is running fine...')
// })
app.use(notFoundHandler);
app.use(errorHandler);

// app.use('/apip')
const PORT = process.env.PORT;

app.listen(PORT, console.log("running on :" + PORT));
