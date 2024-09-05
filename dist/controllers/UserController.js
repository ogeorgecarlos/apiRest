"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _user = require('../models/user'); var _user2 = _interopRequireDefault(_user);
var _error_success_func = require('../utils/error_success_func');

class UserController{

  //create
  async store(req, res){
    try{
      const body = req.body;

      if(!req.body) return res.status(412).json(_error_success_func.error.call(void 0, "É necessário enviar dados para icnlusão do usuário"));

      _user2.default.create(body)
        .then(() =>res.status(201).json(_error_success_func.success.call(void 0, "Usuário criado com sucesso.")))
        .catch( (result) => {
          const errors = [];
          result.errors.forEach(e=> errors.push(e.message));
          res.status(400).json({errors: errors});
        });


    }catch(e){
      if(e.message.endsWith("is not valid JSON"))
        return res.status(401).json(_error_success_func.error.call(void 0, "O objeto enviado deve estar no formato JSON"));

      res.status(500).json(_error_success_func.error.call(void 0, "Não foi possivel processar a solicitação. Tente Novamente."));
    };
  }

  //read one
  async show(req, res){
    try{
      const emailUser = req.body.email;

      if(!emailUser) return res.status(412).json(_error_success_func.error.call(void 0, "É necessário enviar um email para consulta."));

      const user = await _user2.default.findOne({where:{email: emailUser}, attributes:["id", "nome", "email"]});

      if(!user) return res.status(404).json(_error_success_func.error.call(void 0, "Usuário não localizado"));
      return res.status(200).json(user);

    }catch(e){
      if(e.message.endsWith("is not valid JSON"))
        return res.status(401).json(_error_success_func.error.call(void 0, "O objeto enviado deve estar no formato JSON"));

      res.status(500).json(_error_success_func.error.call(void 0, "Não foi possivel processar a solicitação. Tente Novamente."));

    }
  };


  //read all
  async index(req, res){
    try{
      const users = await _user2.default.findAll({attributes: ["id", "nome", "email"]});
      res.status(200).json(users);
    }catch (e2){
      res.status(500).json(_error_success_func.error.call(void 0, "Não foi possivel processar a solicitação. Tente Novamente."));
    };
  };

  //update
  async update(req, res){
    try{

      const body = req.body;
      if(!body) return res.status(412).json(_error_success_func.error.call(void 0, "É necessário enviar dados para prosseguir com a solicitação"));

      const {novoNome, novoEmail, novoPassword} = req.body;
      if(!novoNome && !novoEmail && !novoPassword) return res.status(412).json(_error_success_func.error.call(void 0, "Não foram enviados dados para alteração."));

      const email = req.email;
      const user = await _user2.default.findOne({where:{email}});
      if(!user)
        return res.status(404).json(_error_success_func.error.call(void 0, `Nenhum usuário localizado com o email ${req.email}`));

      user.nome = req.body.novoNome || user.nome;
      user.email = req.body.novoEmail || req.body.email;
      user.password = req.body.novoPassword || req.body.password;
      user.save();

      return res.status(201).json(_error_success_func.success.call(void 0, "User atualizado com sucesso"));

    }catch (e3){
      res.status(500).json(_error_success_func.error.call(void 0, "Não foi possivel processar a solicitação. Tente Novamente."));
    };
  };

  //delete
  async delete(req, res){
    try{
      const userId = req.id;
      if(!userId) return res.status(412).json(_error_success_func.error.call(void 0, "E necessário enviar um userId."));

      const user = await _user2.default.findByPk(userId);
      if(!user) return res.status(404).json(_error_success_func.error.call(void 0, "Não foi localizado usuários com o id informado."));

      await user.destroy()
        .then(() => res.status(200).json(_error_success_func.success.call(void 0, "Usuário exlcuido com sucesso.")))
        .catch(() => res.status(500).json(_error_success_func.error.call(void 0, "Não foi possivel completar a solicitação. Tente novamente.")));


    }catch (e4){
      res.status(500).json(_error_success_func.error.call(void 0, "Não foi possivel completar a solicitação. Tente novamente."));
    }
  };
};

exports. default = new UserController();