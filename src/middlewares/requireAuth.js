import jwt from "jsonwebtoken";

export default function tokenIsValid(req, res, next){
  const token = req.auth;
  if(!token) return res.status(401).json({errors:["É necessário um token para realizar essa ação."]});

  const tokenIsValid = jwt.verify(token, process.env.TOKEN_SECRET);

  if(!tokenIsValid) return res.status(401).json({errors:["O token enviado não é valido. Tente novamente."]});

  req.authorizaton = true;

  next();
}