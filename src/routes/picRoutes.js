import {Router} from "express";
import PicController from "../controllers/picController";
import upload from "../midllewares/multer";

const router = Router();

router.post("/post", upload.single("myFile"), PicController.store);

export default router;