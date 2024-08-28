import express from "express";
import userController from "../controllers/UserController";
import requireEmailPassword from "../midllewares/requireEmailPassword";
import checkSameUser from "../midllewares/checkSameUser";

const router = new express.Router();

router.get("/get", requireEmailPassword, checkSameUser, userController.show);
router.get("/get-all", requireEmailPassword, checkSameUser,userController.index);
router.put("/update", requireEmailPassword, checkSameUser, userController.update);
router.post("/create", userController.store);
router.delete("/delete", requireEmailPassword, checkSameUser, userController.delete);

export default router;