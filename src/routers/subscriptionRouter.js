import express from "express";

import { getSubscribers, subscribeTo } from "../controllers/userController";
// import router from "./productRouter";

const router = express.Router();

router.route("/:id/:chefId/:periodId").get(subscribeTo);

router.route("/list").get(getSubscribers);

module.exports = router;
