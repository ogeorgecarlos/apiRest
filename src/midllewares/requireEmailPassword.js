import User from "../models/user";
const bcrypt = require("bcryptjs");

export default async function (req, res, next){
  const body = req.body;
  if(!body) return res.status(404).json({errors:["Para login,é necessario enviar email e senha."]});

  const {email, password} = body;
  if(!email || !password) return res.status(412).json({errors:["Para login,é necessario enviar email e senha."]});

  const user = await User.findOne({where:{email}});
  if(!user) return res.status(401).json({errors:[`Email "${email}" não localizado.`]});

  const password_hashUser = user.password_hash;
  if(!password_hashUser) return res.status(412).json({errors:[`É necessário cadastrar uma nova senha para o usuário`]});

  const passwordIsValid = await bcrypt.compare(password, password_hashUser);
  if(!passwordIsValid) return res.status(401).json({errors:[`Password inválido`]});

  req.email = user.email;
  req.id = user.id;

  next();
};