import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {error} from "../utils/error_success_func";

class TokenController{
  async store(req, res){

    try{
      const body = req.body;
      if(!body) return res.status(412).json(error("É necessario o envio de credenciais para gerar token de acesso"));

      const {email = "", password = ""} = body;

      const user = await User.findOne({where:{email}});
      if(!user) return res.status(404).json(error(`Usuário não localizado com o e-mail ${email}`));

      const dbPassword = user.password_hash;
      if(!dbPassword) return res.status(500).json(error(`Não foi possivel realizar a operação.`));

      const passwordIsValid = await bcrypt.compare(password, dbPassword);
      if(!passwordIsValid) return res.status(401).json(error(`A senha fornecida está incorreta.`));

      const token = jwt.sign({idUser:req.id, mailUser:req.email}, process.env.TOKEN_SECRET,{expiresIn: process.env.TOKEN_EXPIRATION});


      res.status(201).json({token});
    }catch(e){
      if(e.message.endsWith("is not valid JSON"))
        return res.status(401).json(error("O objeto enviado deve estar no formato JSON"));

      res.status(500).json(error("Não foi possivel processar a solicitação. Tente Novamente."));
    }
  };

  async checkToken(req, res, next){
    try{
      //codigo
      const hasAuthheader = req.rawHeaders.some(e => e === "autorizathion");
      if(!hasAuthheader) return res.status(401).json(error(`É necessario o envio do token no header "autorizathion"`));

      const token = req.rawHeaders[req.rawHeaders.findIndex(e => e === "autorizathion") +1];
      if(!token) return res.status(401).json(error(`É necessario o envio do token no header "autorizathion"`));
      
      jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded)=>{
        if(err) return res.status(401).json(error(`O token enviado não é valido`));
        if(decoded.idUser !== req.id || decoded.mailUser !== req.email) return res.status(401).json(error("As credencais não estão de acordo com o token enviado."));
        next();
      });
    }catch(e){
      if(e.message.endsWith("is not valid JSON"))
        return res.status(401).json(error("O objeto enviado deve estar no formato JSON"));

      res.status(500).json(error("Não foi possivel processar a solicitação. Tente Novamente."));
    }
  };
};

export default new TokenController();