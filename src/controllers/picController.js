import path from "path";

import {error, success} from "../utils/error_success_func";
import Alunos from "../models/Aluno";
import Fotos from "../models/Fotos";

class PicController{
  async store(req, res){
    try{
      const file = req.file;
      if(!file) return res.status(412).json(error("Anexe uma foto para realizar o upload."));

      const email = req.email;
      if(!email) return res.status(412).json(error("É necessário e-mail para atualização de fotos."));

      const aluno = await Alunos.findOne({where:{email}});
      const alunoId = aluno.id;

      const body = {
        original_name: req.file.originalname,
        file_name: req.file.filename,
        aluno_id: alunoId
      };

      await Fotos.create(body)
        .then(()=> res.json(success("foto adicionada")))
        .catch(()=> res.json(error("foto não adicionada")));

      //return res.status(201).json(success(`Arquivo "${file.originalname}" enviado com sucesso`));
    }catch{
      return res.status(500).json(error("Erro inesperado no servidor"));
    }
  }

  async download(req, res){
    try{
      const {file_name} = req.params;
      if(!file_name) return res.status(412).json(error("Enter the file name to download"));

      const caminho = path.resolve(__dirname, "..","uploads", "images", file_name);
      res.attachment(caminho);
      return res.sendFile(caminho);
      //return res.status(200).json(success("Download's done!"));}
    }catch{
      //console.log(e);
    };
  }
}

export default new PicController();