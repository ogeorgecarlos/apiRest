import Aluno from "../models/Aluno";
import Foto from "../models/Fotos";
import {error, success} from "../utils/error_success_func";

class AlunosController {

  async index(req, res){
    try{
      const alunos = await Aluno.findAll({
        attributes:["id", "nome", "email", "peso", "altura"],
        order:[["id", "ASC"], [Foto, "id", "DESC"]],
        include:{
          model: Foto,
          attributes: ["file_name", "created_at"]
        }
      });
      if(!alunos) return res.status(204).json(error("Não foi localizado alunos com as informações cedidas."));

      res.status(200).json(alunos);
    }catch(e){
      console.log(e);
      res.status(500).json(error("Não foi possivel completar a solicitação. Tente novamente."));
    }
  };

  //show
  async show(req,res){
    try{
      const email = req.email;
      console.log(email);
      if(!email) return res.status(412).json(error("É necessário informar id ou Email do aluno que deseja consultar."));

      const alunoAttributes = ["id", "nome", "sobrenome", "email", "idade", "peso", "altura"];
      const fotoAttributes = ["file_name", "created_at"];
      const aluno = await Aluno.findOne({
        where:{email: email},
        attributes: alunoAttributes,
        order: [["id","ASC"], [Foto, "created_at", "DESC"]],
        include:{
          model: Foto,
          attributes: fotoAttributes,
        }
      });

      if(!aluno) return res.status(204).json(error("Não foi localizado alunos com as informações cedidas."));

      res.status(200).json(aluno);
    }catch{
      res.status(500).json(error("Não foi possivel completar a solicitação. Tente novamente."));
    }
  };

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

  async update(req,res){
    try{
      const alunoMail = req.email;
      if(!alunoMail) return res.status(412).json(error("É necessário informar o email atual do aluno que deseja atualizar."));

      const aluno = await Aluno.findOne({where:{email: alunoMail}});
      if(!aluno) return res.status(404).json(error("Não foi localizado aluno para o email informado."));

      const body = req.body;
      if(!body) return res.status(412).json(error("É necessário enviar dados para atualização do registro"));

      const {nome, sobrenome, email, idade, peso, altura} = body;
      //melhorar essa avaliacao
      if(!nome || !sobrenome || !email || !idade || !peso || !altura)
        return res.status(412).json(error("É necessario preencher todos os dados para criação de um novo aluno"));

      const alunoUpdated = await aluno.update(body);
      if(!alunoUpdated) return res.status(500).json(error("Algo correu mal. Tente novamente."));

      res.status(200).json(success("Adicionado com sucesso"));
    }catch{
      res.status(500).json(error("Não foi possivel completar a solicitação. Tente novamente."));
    }
  }

  //delete
  async delete(req, res){
    try{
      const {email} = req.query;
      if(!email) return res.status(412).json(error("É necessário informar o email atual do aluno que deseja atualizar."));

      const aluno = await Aluno.findOne({where:{email}});
      if(!aluno) return res.status(404).json(error("Não foi localizado aluno para o email informado."));

      aluno.destroy()
        .then(()=> res.status(200).json(success("Aluno excluido do banco de dados")))
        .catch(() => res.status(500).json(error("Algo ocorreu mal. tente novamente.")));

    }catch{
      res.status(500).json(error("Não foi possivel completar a solicitação. Tente novamente."));
    }
  }
}

export default new AlunosController();