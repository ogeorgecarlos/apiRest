const bcrypt = require("bcryptjs");
import basicAuth from "basic-auth";
import {error} from "../utils/error_success_func";
import User from "../models/user";

export default async function (req, res, next){
  try{
    const auth = basicAuth(req);
    if(!auth) return res.status(404).json(error("é necessário incluir credenciais de acesso."));
    const {name:email, pass:password} = auth;
    if(!email || !password) return res.status(404).json(error("Para login,é necessario enviar email e senha."));

    const user = await User.findOne({where:{email}});
    if(!user) return res.status(401).json(error(`Email "${email}" não localizado.`));

    const password_hashUser = user.password_hash;
    if(!password_hashUser) return res.status(412).json(error(`É necessário cadastrar uma nova senha para o usuário`));

    const passwordIsValid = await bcrypt.compare(password, password_hashUser);
    if(!passwordIsValid) return res.status(401).json(error("Password inválido"));

    req.email = user.email;
    req.id = user.id;

    next();
  }catch{
    return res.status(500).json(error("erro ao processar solicitação. tente novamente mais tarde."));
  }
};