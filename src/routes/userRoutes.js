import express from "express";
import userController from "../controllers/UserController";

const router = new express.Router();

router.get("/getOne", userController.index);
router.get("/getall", userController.readAll);
router.post("/", userController.store);

export default router;