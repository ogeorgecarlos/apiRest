import {error, success} from "../utils/error_success_func";
import Alunos from "../models/Aluno";
import Fotos from "../models/Fotos";

class PicController{
  async store(req, res){
    try{
      const file = req.file;
      if(!file) return res.status(412).json(error("Anexe uma foto para realizar o upload."));

      //dinamizar email , mas precisa incluir o requiere antes do controller foto
      const aluno = await Alunos.findOne({where:{email: "georgecarlos@live.com"}});
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
    }catch(e){
      //console.log(e);
      return res.status(500).json(error("Erro inesperado no servidor"));
    }
  }
}

export default new PicController();