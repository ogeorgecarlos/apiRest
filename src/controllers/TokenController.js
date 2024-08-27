import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class TokenController{
  async store(req, res){

    try{
      const body = req.body;
      if(!body) return res.status(412).json({errors: ["É necessario o envio de credenciais para gerar token de acesso"]});

      const {id, email = "", password = ""} = body;

      const user = await User.findOne({where:{email}});
      if(!user) return res.status(404).json({errors:[`Usuário não localizado com o e-mail ${email}`]});

      const dbPassword = user.password_hash;
      if(!dbPassword) return res.status(500).json({errors:[`Não foi possivel realizar a operação.`]});

      const passwordIsValid = await bcrypt.compare(password, dbPassword);
      if(!passwordIsValid) return res.status(401).json({errors:[`A senha fornecida está incorreta.`]});

      const token = jwt.sign({id, email}, process.env.TOKEN_SECRET,{expiresIn: process.env.TOKEN_EXPIRATION});


      res.status(201).json({token});
    }catch(e){
      if(e.message.endsWith("is not valid JSON"))
        return res.status(401).json({error:["O objeto enviado deve estar no formato JSON"]});

      res.status(500).json("Não foi possivel processar a solicitação. Tente Novamente.");
    }
  }
};

export default new TokenController();