"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }const bcrypt = require("bcryptjs");
var _basicauth = require('basic-auth'); var _basicauth2 = _interopRequireDefault(_basicauth);
var _error_success_func = require('../utils/error_success_func');
var _user = require('../models/user'); var _user2 = _interopRequireDefault(_user);

exports. default = async function (req, res, next){
  try{
    const auth = _basicauth2.default.call(void 0, req);
    if(!auth) return res.status(404).json(_error_success_func.error.call(void 0, "é necessário incluir credenciais de acesso."));
    const {name:email, pass:password} = auth;
    if(!email || !password) return res.status(404).json(_error_success_func.error.call(void 0, "Para login,é necessario enviar email e senha."));

    const user = await _user2.default.findOne({where:{email}});
    if(!user) return res.status(401).json(_error_success_func.error.call(void 0, `Email "${email}" não localizado.`));

    const password_hashUser = user.password_hash;
    if(!password_hashUser) return res.status(412).json(_error_success_func.error.call(void 0, `É necessário cadastrar uma nova senha para o usuário`));

    const passwordIsValid = await bcrypt.compare(password, password_hashUser);
    if(!passwordIsValid) return res.status(401).json(_error_success_func.error.call(void 0, "Password inválido"));

    req.email = user.email;
    req.id = user.id;

    next();
  }catch(e){
    console.log(e);
    return res.status(500).json(_error_success_func.error.call(void 0, "erro ao processar solicitação. tente novamente mais tarde."));
  }
};