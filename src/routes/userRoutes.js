import express from "express";
import userController from "../controllers/UserController";
import requireEmailPassword from "../midllewares/requireEmailPassword";

const router = new express.Router();

router.get("/get", requireEmailPassword, userController.show);
router.get("/get-all", requireEmailPassword, userController.index);
router.put("/update", requireEmailPassword, userController.update);
router.post("/create", userController.store);
router.delete("/delete", requireEmailPassword, userController.delete);

export default router;