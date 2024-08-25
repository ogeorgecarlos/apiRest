import express from "express";
import userController from "../controllers/UserController";

const router = new express.Router();

router.post("/", userController.store);

export default router;