"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _Fotos = require('../models/Fotos'); var _Fotos2 = _interopRequireDefault(_Fotos);
var _error_success_func = require('../utils/error_success_func');

class AlunosController {

  async index(req, res){
    try{
      const alunos = await _Aluno2.default.findAll({
        attributes:["id", "nome", "email", "peso", "altura"],
        order:[["id", "ASC"], [_Fotos2.default, "id", "DESC"]],
        include:{
          model: _Fotos2.default,
          attributes: ["file_name", "created_at"]
        }
      });
      if(!alunos) return res.status(204).json(_error_success_func.error.call(void 0, "Não foi localizado alunos com as informações cedidas."));

      res.status(200).json(alunos);
    }catch (e){
      res.status(500).json(_error_success_func.error.call(void 0, "Não foi possivel completar a solicitação. Tente novamente."));
    }
  };

  //show
  async show(req,res){
    try{
      const email = req.email;
      if(!email) return res.status(412).json(_error_success_func.error.call(void 0, "É necessário informar id ou Email do aluno que deseja consultar."));

      const alunoAttributes = ["id", "nome", "sobrenome", "email", "idade", "peso", "altura"];
      const fotoAttributes = ["url", "file_name", "created_at"];
      const aluno = await _Aluno2.default.findOne({
        where:{email: email},
        attributes: alunoAttributes,
        order: [["id","ASC"], [_Fotos2.default, "created_at", "DESC"]],
        include:{
          model: _Fotos2.default,
          attributes: fotoAttributes,
        }
      });

      if(!aluno) return res.status(204).json(_error_success_func.error.call(void 0, "Não foi localizado alunos com as informações cedidas."));

      res.status(200).json(aluno);
    }catch (e2){
      res.status(500).json(_error_success_func.error.call(void 0, "Não foi possivel completar a solicitação. Tente novamente."));
    }
  };

  async store(req, res){
    try{
      const body = req.body;
      if(!body) return res.status(412).json(_error_success_func.error.call(void 0, "É necessário enviar dados para criação de um novo aluno"));

      const {nome, sobrenome, email, idade, peso, altura} = body;
      //melhorar essa avaliacao
      if(!nome || !sobrenome || !email || !idade || !peso || !altura)
        return res.status(412).json(_error_success_func.error.call(void 0, "É necessario preencher todos os dados para criação de um novo aluno"));

      const aluno = await _Aluno2.default.create(body);
      if(!aluno) return res.status(500).json(_error_success_func.error.call(void 0, "Algo correu mal. Tente novamente."));

      res.status(200).json(_error_success_func.success.call(void 0, "Adicionado com sucesso"));

    }catch (e3){
      res.status(500).json(_error_success_func.error.call(void 0, "Não foi possivel completar a solicitação. Tente novamente."));
    }
  }

  async update(req,res){
    try{
      const alunoMail = req.email;
      if(!alunoMail) return res.status(412).json(_error_success_func.error.call(void 0, "É necessário informar o email atual do aluno que deseja atualizar."));

      const aluno = await _Aluno2.default.findOne({where:{email: alunoMail}});
      if(!aluno) return res.status(404).json(_error_success_func.error.call(void 0, "Não foi localizado aluno para o email informado."));

      const body = req.body;
      if(!body) return res.status(412).json(_error_success_func.error.call(void 0, "É necessário enviar dados para atualização do registro"));

      const {nome, sobrenome, email, idade, peso, altura} = body;
      //melhorar essa avaliacao
      if(!nome || !sobrenome || !email || !idade || !peso || !altura)
        return res.status(412).json(_error_success_func.error.call(void 0, "É necessario preencher todos os dados para criação de um novo aluno"));

      const alunoUpdated = await aluno.update(body);
      if(!alunoUpdated) return res.status(500).json(_error_success_func.error.call(void 0, "Algo correu mal. Tente novamente."));

      res.status(200).json(_error_success_func.success.call(void 0, "Adicionado com sucesso"));
    }catch (e4){
      res.status(500).json(_error_success_func.error.call(void 0, "Não foi possivel completar a solicitação. Tente novamente."));
    }
  }

  //delete
  async delete(req, res){
    try{
      const {email} = req.query;
      if(!email) return res.status(412).json(_error_success_func.error.call(void 0, "É necessário informar o email atual do aluno que deseja atualizar."));

      const aluno = await _Aluno2.default.findOne({where:{email}});
      if(!aluno) return res.status(404).json(_error_success_func.error.call(void 0, "Não foi localizado aluno para o email informado."));

      aluno.destroy()
        .then(()=> res.status(200).json(_error_success_func.success.call(void 0, "Aluno excluido do banco de dados")))
        .catch(() => res.status(500).json(_error_success_func.error.call(void 0, "Algo ocorreu mal. tente novamente.")));

    }catch (e5){
      res.status(500).json(_error_success_func.error.call(void 0, "Não foi possivel completar a solicitação. Tente novamente."));
    }
  }
}

exports. default = new AlunosController();