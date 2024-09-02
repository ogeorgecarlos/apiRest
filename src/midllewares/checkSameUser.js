import {error} from "../utils/error_success_func";

export default async function (req, res, next){
  try{
    const body = req.body;
    if(!body) return res.status(412).json(error("Envie email e password para deletar usuário"));

    const {email, password} = body;
    if(!email || !password) return res.status(412).json(error("Confirme e-mail e password para deletar usuário"));
    if(email !== req.email) return res.status(401).json(error("Só é possivel fazer solicitações para seu proprio e-mail"));

    next();

  }catch{
    //console.log(e);
  }
}