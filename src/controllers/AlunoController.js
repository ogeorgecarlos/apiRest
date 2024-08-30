import Aluno from "../models/Aluno";
import {error, success} from "../utils/error_success_func";

class AlunosController {

  async index(req, res){
    try{
      const alunos = await Aluno.findAll({attributes:["nome", "email", "peso", "altura"]});
      if(!alunos) return res.status(204).json(error("Não foi localizado alunos com as informações cedidas."));

      res.status(200).json(alunos);
    }catch{
      res.status(500).json(error("Não foi possivel completar a solicitação. Tente novamente."));
    }
  };

  //show
  async show(req,res){
    try{
      const {id, email} = req.query;

      if(!id && !email) return res.status(412).json(error("É necessário informar id ou Email do aluno que deseja consultar."));

      const attributes = ["id", "nome", "sobrenome", "email", "idade", "peso", "altura"];
      const aluno = await Aluno.findOne({where:{email}, attributes}) || await Aluno.findByPk(id,{attributes});
      if(!aluno) return res.status(204).json(error("Não foi localizado alunos com as informações cedidas."));

      res.status(200).json(aluno);
    }catch{
      res.status(500).json(error("Não foi possivel completar a solicitação. Tente novamente."));
    }
  };

  //store
  async store(req, res){
    try{
      const body = req.body;
      if(!body) return res.status(412).json(error("É necessário enviar dados para criação de um novo aluno"));

      const {nome, sobrenome, email, idade, peso, altura} = body;
      //melhorar essa avaliacao
      if(!nome || !sobrenome || !email || !idade || !peso || !altura)
        return res.status(412).json(error("É necessario preencher todos os dados para criação de um novo aluno"));

      const aluno = await Aluno.create(body);
      if(!aluno) return res.status(500).json(error("Algo correu mal. Tente novamente."));

      res.status(200).json(success("Adicionado com sucesso"));

    }catch{
      res.status(500).json(error("Não foi possivel completar a solicitação. Tente novamente."));
    }
  }

  //update
  //delete

}

export default new AlunosController();