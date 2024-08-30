import express from "express";

import AlunosController from "../controllers/AlunoController";
import requireEmailPassword from "../midllewares/requireEmailPassword";
import TokenController from "../controllers/TokenController";

const router = new express.Router();

router.get("/get", requireEmailPassword, TokenController.checkToken, AlunosController.show);
router.get("/get-all", requireEmailPassword, TokenController.checkToken, AlunosController.index);
router.post("/create", requireEmailPassword, TokenController.checkToken, AlunosController.store);
router.put("/update", requireEmailPassword, TokenController.checkToken, AlunosController.update);
router.delete("/delete", requireEmailPassword, TokenController.checkToken, AlunosController.delete);

export default router;
