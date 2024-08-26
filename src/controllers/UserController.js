import User from "../models/user";

class UserController{

  //create
  async store(req, res){
    try{
      const body = req.body ?? JSON.parse({"":""});
      const novoUser = await User.create(body);
      res.json(novoUser);
    }catch(e){
      if(e.name === "SequelizeValidationError") //Precisa validar quando o usuario envia um formato diferente de json
        return res.status(400).json({errors: `erro de envio tente novamente: ${e.errors.map(err => err.message)}`});
    };
  }

  //read one
  async index(req, res){
    try{
      const emailreq = req.query.email ?? "";
      const user = await User.findOne({where:{email: emailreq}});
      if(user) return res.status(200).json(user);
      return res.status(200).json({errors: "Usuário não localizado"});

    }catch(e){
      res.status(400).json("Não foi possivel completar a solicitação. Tente novamente." + e.name);

    }
  };
};

export default new UserController();