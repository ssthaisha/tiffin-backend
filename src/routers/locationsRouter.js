import { io } from "../socket";
import express from "express";
import asyncHandler from "express-async-handler";

const router = express.Router();

router.post(
  "/update/:chefId/:customerId",
  asyncHandler(async (req, res) => {
    const { latitude, longitude } = req.body;
    const { chefId, customerId } = req.params;
    console.log(latitude, longitude, "gps");
    io.emit("message", `${JSON.stringify({ latitude, longitude })}`);
    res.json({
      latitude,
      longitude,
      success: true,
    });
  })
);

module.exports = router;
