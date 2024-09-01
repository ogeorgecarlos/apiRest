import {error, success} from "../utils/error_success_func";
import Alunos from "../models/Aluno";
import Fotos from "../models/Fotos";

class PicController{
  async store(req, res){
    try{
      console.log(req.file);
      const file = req.file;
      if(!file) return res.status(412).json(error("Anexe um foto para realizar o upload."));

      const aluno = await Alunos.findOne({where:{email: "georgecarlos@live.com"}});
      const alunoId = aluno.id;

      const body = {
        original_name: req.file.originalname,
        file_name: req.file.filename,
        aluno_id: alunoId
      };

      await Fotos.create(body)
        .then(()=> res.json("foto adicionada"))
        .catch(()=> res.json("foto não adicionada"));

      //return res.status(201).json(success(`Arquivo "${file.originalname}" enviado com sucesso`));
    }catch(e){
      console.log(e);
      return res.status(500).json(error("Erro inesperado no servidor"));
    }
  }
}

export default new PicController();