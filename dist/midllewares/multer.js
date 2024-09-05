"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _path = require('path');

// **************CONFIG MULTER

//to return a randomic number between 10k and 20k
const randomNum = () => Math.floor(Math.random()*10000 + 10000);

//Allowed pic types
const allowedTypes = ["image/jpg", "image/jpeg", "image/png"];

const upload = _multer2.default.call(void 0, {

  storage: _multer2.default.diskStorage({
    destination: (req, file, cb) =>{
      cb(null, _path.resolve.call(void 0, __dirname, "..", "uploads", "images"));//Definindo pasta de uploads dos arquivos;
    },
    filename: (req, file, cb) => {
      cb(null, Date.now()+"-"+randomNum()+_path.extname.call(void 0, file.originalname));
    }
  }),
  
  fileFilter:(req, file, cb) =>{
    if(allowedTypes.some(e=> e.toLowerCase()===file.mimetype.toLowerCase())){
      return cb(null, true);
    };
    return cb(new Error('Apenas imagens (png, jpg, jpeg) são permitidas!'), false);
  }
});

exports. default = upload;
