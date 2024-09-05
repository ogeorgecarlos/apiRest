"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);

class HomeController{
  async index(req, res){
    try{
      const novoAluno = await _Aluno2.default.create({
        nome: "Angela",
        sobrenome: "Maria",
        email: "Angelamaria@live.com",
        idade: 20,
        peso: 85,
        altura: 1.80,
      });
      res.json(novoAluno);
    }catch (e){
      //console.log(e.message);
    };
  }
}

exports. default = new HomeController();