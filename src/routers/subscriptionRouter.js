import express from "express";

import {
  acceptRequest,
  getSubscribers,
  subscribeTo,
} from "../controllers/userController";
// import router from "./productRouter";

const router = express.Router();

router.route("/:id/:chefId/:periodId").get(subscribeTo);

router.route("/list/:chefId").get(getSubscribers);

router.route("/approve/:id").get(acceptRequest);

module.exports = router;
