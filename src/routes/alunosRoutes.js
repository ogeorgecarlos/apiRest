import express from "express";

import AlunosController from "../controllers/AlunoController";

const router = new express.Router();

router.get("/get", AlunosController.show);
router.get("/get-all", AlunosController.index);
router.post("/create", AlunosController.store);

export default router;
