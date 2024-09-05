"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _error_success_func = require('../utils/error_success_func');

exports. default = async function (req, res, next){
  try{
    const body = req.body;
    if(!body) return res.status(412).json(_error_success_func.error.call(void 0, "Envie email e password para deletar usuário"));

    const {email, password} = body;
    if(!email || !password) return res.status(412).json(_error_success_func.error.call(void 0, "Confirme e-mail e password para deletar usuário"));
    if(email !== req.email) return res.status(401).json(_error_success_func.error.call(void 0, "Só é possivel fazer solicitações para seu proprio e-mail"));

    next();

  }catch (e){
    //console.log(e);
  }
}