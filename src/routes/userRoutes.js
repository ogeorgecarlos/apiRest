import express from "express";
import userController from "../controllers/UserController";

const router = new express.Router();

router.get("/get", userController.show);
router.get("/get-all", userController.index);
router.put("/update", userController.update);
router.post("/create", userController.store);
router.delete("/delete", userController.delete);

export default router;