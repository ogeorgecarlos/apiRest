import multer from "multer";
import {resolve, extname} from "path";

// **************CONFIG MULTER

//to return a randomic number between 10k and 20k
const randomNum = () => Math.floor(Math.random()*10000 + 10000);

const upload = multer({

  storage: multer.diskStorage({
    destination: (req, file, cb) =>{
      cb(null, resolve(__dirname, "..", "uploads"));//Definindo pasta de uploads dos arquivos;
    },
    filename: (req, file, cb) => {
      cb(null, Date.now()+"-"+randomNum()+extname(file.originalname));
    }
  })
});

export default upload;
