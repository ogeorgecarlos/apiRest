import Aluno from "../models/Aluno";
import {error, success} from "../utils/error_success_func";

export default class AlunosController {
  //index
  async index(req, res){
    try{
      const alunos = await Aluno.findAll({attributes:["nome", "email", "peso", "altura"]});
      if(!alunos) res.status(204).json(success("Não há dados a serem exibidos"));

      res.status(200).json(alunos)
    }catch(e){
      console.log(e);
    }
  };

  //show
  //store
  //update
  //delete

}