"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _user = require('../models/user'); var _user2 = _interopRequireDefault(_user);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _error_success_func = require('../utils/error_success_func');

class TokenController{
  async store(req, res){

    try{
      const body = req.body;
      if(!body) return res.status(412).json(_error_success_func.error.call(void 0, "É necessario o envio de credenciais para gerar token de acesso"));

      const {email = "", password = ""} = body;

      const user = await _user2.default.findOne({where:{email}});
      if(!user) return res.status(404).json(_error_success_func.error.call(void 0, `Usuário não localizado com o e-mail ${email}`));

      const dbPassword = user.password_hash;
      if(!dbPassword) return res.status(500).json(_error_success_func.error.call(void 0, `Não foi possivel realizar a operação.`));

      const passwordIsValid = await _bcryptjs2.default.compare(password, dbPassword);
      if(!passwordIsValid) return res.status(401).json(_error_success_func.error.call(void 0, `A senha fornecida está incorreta.`));

      const token = _jsonwebtoken2.default.sign({idUser:req.id, mailUser:req.email}, process.env.TOKEN_SECRET,{expiresIn: process.env.TOKEN_EXPIRATION});


      res.status(201).json({token});
    }catch(e){
      if(e.message.endsWith("is not valid JSON"))
        return res.status(401).json(_error_success_func.error.call(void 0, "O objeto enviado deve estar no formato JSON"));

      res.status(500).json(_error_success_func.error.call(void 0, "Não foi possivel processar a solicitação. Tente Novamente."));
    }
  };

  async checkToken(req, res, next){
    try{
      //codigo
      const hasAuthheader = req.rawHeaders.some(e => e === "autorizathion");
      if(!hasAuthheader) return res.status(401).json(_error_success_func.error.call(void 0, `É necessario o envio do token no header "autorizathion"`));

      const token = req.rawHeaders[req.rawHeaders.findIndex(e => e === "autorizathion") +1];
      if(!token) return res.status(401).json(_error_success_func.error.call(void 0, `É necessario o envio do token no header "autorizathion"`));
      
      _jsonwebtoken2.default.verify(token, process.env.TOKEN_SECRET, (err, decoded)=>{
        if(err) return res.status(401).json(_error_success_func.error.call(void 0, `O token enviado não é valido`));
        if(decoded.idUser !== req.id || decoded.mailUser !== req.email) return res.status(401).json(_error_success_func.error.call(void 0, "As credencais não estão de acordo com o token enviado."));
        next();
      });
    }catch(e){
      if(e.message.endsWith("is not valid JSON"))
        return res.status(401).json(_error_success_func.error.call(void 0, "O objeto enviado deve estar no formato JSON"));

      res.status(500).json(_error_success_func.error.call(void 0, "Não foi possivel processar a solicitação. Tente Novamente."));
    }
  };
};

exports. default = new TokenController();