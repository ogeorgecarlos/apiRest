import express from "express";

import AlunosController from "../controllers/AlunoController";

const router = new express.Router();

router.get("/get-all", AlunosController.index);

export default router;
