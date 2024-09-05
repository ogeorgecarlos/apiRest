import {Router} from "express";
import PicController from "../controllers/picController";
import upload from "../midllewares/multer";
import requireEmailPassword from "../midllewares/requireEmailPassword";
import TokenController from "../controllers/TokenController";
import picController from "../controllers/picController";


const router = Router();

router.post("/post", requireEmailPassword, TokenController.checkToken, upload.single("myFile"), PicController.store);
router.get("/download/:file_name", requireEmailPassword, TokenController.checkToken, picController.download);

export default router;