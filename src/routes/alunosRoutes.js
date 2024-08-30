import express from "express";

import AlunosController from "../controllers/AlunoController";
import requireEmailPassword from "../midllewares/requireEmailPassword";

const router = new express.Router();

router.get("/get", requireEmailPassword, AlunosController.show);
router.get("/get-all", requireEmailPassword, AlunosController.index);
router.post("/create", requireEmailPassword, AlunosController.store);
router.put("/update", requireEmailPassword, AlunosController.update);
router.delete("/delete", requireEmailPassword, AlunosController.delete);

export default router;
