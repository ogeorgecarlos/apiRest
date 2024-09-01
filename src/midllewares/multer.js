import multer from "multer";
import {resolve, extname} from "path";

// **************CONFIG MULTER

//to return a randomic number between 10k and 20k
const randomNum = () => Math.floor(Math.random()*10000 + 10000);

//Allowed pic types
const allowedTypes = ["image/jpg", "image.jpeg", "image/png"]

const upload = multer({

  storage: multer.diskStorage({
    destination: (req, file, cb) =>{
      cb(null, resolve(__dirname, "..", "uploads"));//Definindo pasta de uploads dos arquivos;
    },
    filename: (req, file, cb) => {
      cb(null, Date.now()+"-"+randomNum()+extname(file.originalname));
    }
  }),

  //talvez seja melhor tratar o erro no controller
  // fileFilter:(req, file, cb) =>{
  //   if(!allowedTypes.some(e=> e===file.mimetype))
  //     cb(null, false);
  //   return cb(new Error('Apenas imagens (png, jpg, jpeg) são permitidas!'));
  // }
});

export default upload;
