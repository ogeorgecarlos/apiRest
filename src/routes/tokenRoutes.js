import express from "express";
import tokenController from "../controllers/TokenController";
import requireEmailPassword from "../midllewares/requireEmailPassword";

const router = new express.Router();

router.post("/", requireEmailPassword, tokenController.store);

export default router;