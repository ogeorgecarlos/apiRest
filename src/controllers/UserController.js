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


  //read all
  async readAll(req, res){
    try{
      const users = await User.findAll();
      res.status(200).json(users);
    }catch(e){
      res.json(e.message);
    };
  };

  //update
  async update(req, res){
    try{
      const pkUser = req.query.pk;
      if(!pkUser)
        return res.status(400).json("É necessário informar um ID para atualização");

      const user = await User.findByPk(pkUser);
      if(!user)
        return res.status(400).json(`Nenhum usuário localizado com o id ${pkUser}`);

      user.nome = req.body.nome;
      user.email = req.body.email;
      user.save();

      return res.status(200).json(user);

    }catch(e){
      res.status(400).json(e.errors);
    };
  };
};

export default new UserController();