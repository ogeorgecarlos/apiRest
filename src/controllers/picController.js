import {error, success} from "../utils/error_success_func";

class PicController{
  async store(req, res){
    try{
      console.log(req.file);
      const file = req.file;
      if(!file) return res.status(412).json(error("Anexe um foto para realizar o upload."));

      return res.status(201).json(success(`Arquivo "${file.originalname}" enviado com sucesso`));
    }catch{
      return res.status(500).json(error("Erro inesperado no servidor"));
    }
  }
}

export default new PicController();