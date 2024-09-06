import express from "express";
import userController from "../controllers/UserController";
import requireEmailPassword from "../midllewares/requireEmailPassword";
//import checkSameUser from "../midllewares/checkSameUser"; voltar a implementar
import TokenController from "../controllers/TokenController";

const router = new express.Router();

router.get("/get", requireEmailPassword, TokenController.checkToken,  userController.show);
router.get("/get-all", userController.index);
router.put("/update", requireEmailPassword, TokenController.checkToken,  userController.update);
router.post("/create", userController.store);
router.delete("/delete", requireEmailPassword, TokenController.checkToken,  userController.delete);

export default router;