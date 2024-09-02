import {Router} from "express";
import PicController from "../controllers/picController";
import upload from "../midllewares/multer";
import requireEmailPassword from "../midllewares/requireEmailPassword";
import TokenController from "../controllers/TokenController";


const router = Router();

router.post("/post", requireEmailPassword,TokenController.checkToken, upload.single("myFile"), PicController.store);

export default router;