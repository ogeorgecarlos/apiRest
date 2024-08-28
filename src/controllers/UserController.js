import User from "../models/user";

class UserController{

  //create
  async store(req, res){
    try{
      const body = req.body;

      if(!req.body) return res.status(412).json({errors: ["É necessário enviar dados para icnlusão do usuário"]});

      User.create(body)
        .then(() =>res.status(201).json({success: ["Usuário criado com sucesso."]}))
        .catch( (result) => {
          const errors = [];
          result.errors.forEach(e=> errors.push(e.message));
          res.status(400).json({errors: errors});
        });


    }catch(e){
      if(e.message.endsWith("is not valid JSON"))
        return res.status(401).json({error:["O objeto enviado deve estar no formato JSON"]});

      res.status(500).json("Não foi possivel processar a solicitação. Tente Novamente.");
    };
  }

  //read one
  async show(req, res){
    try{
      const emailUser = req.body.email;

      if(!emailUser) return res.status(412).json({errors: ["É necessário enviar um email para consulta."]});

      const user = await User.findOne({where:{email: emailUser}});

      if(!user) return res.status(404).json({errors:"Usuário não localizado"});
      return res.status(200).json(user);

    }catch(e){
      if(e.message.endsWith("is not valid JSON"))
        return res.status(401).json({error:["O objeto enviado deve estar no formato JSON"]});

      res.status(500).json("Não foi possivel processar a solicitação. Tente Novamente.");

    }
  };


  //read all
  async index(req, res){
    try{
      const users = await User.findAll();
      res.status(200).json(users);
    }catch{
      res.status(500).json("Não foi possivel processar a solicitação. Tente Novamente.");
    };
  };

  //update
  async update(req, res){
    try{
      // const pkUser = req.query.pk;
      // if(!pkUser)
      //   return res.status(412).json("É necessário informar um ID para atualização");

      const body = req.body;
      if(!body) return res.status(412).json({errros:["É necessário enviar dados para prosseguir com a solicitação"]});

      const {novoNome, novoEmail, novoPassword} = req.body;
      if(!novoNome && !novoEmail && !novoPassword) return res.status(412).json({erros:["Não foram enviados dados para alteração."]});

      const email = req.email;
      const user = await User.findOne({where:{email}});
      if(!user)
        return res.status(404).json(`Nenhum usuário localizado com o email ${req.email}`);

      user.nome = req.body.novoNome || user.nome;
      user.email = req.body.novoEmail || req.body.email;
      user.password = req.body.novoPassword || req.body.password;
      user.save();

      return res.status(201).json({success: ["User atualizado com sucesso"]});

    }catch{
      res.status(500).json("Não foi possivel processar a solicitação. Tente Novamente.");
    };
  };

  //delete
  async delete(req, res){
    try{
      const userId = req.id;
      if(!userId) return res.status(412).json({errors:["E necessário enviar um userId."]});

      const user = await User.findByPk(userId);
      if(!user) return res.status(404).json({errors: ("Não foi localizado usuários com o id informado.")});

      await user.destroy()
        .then(() => res.status(200).json({success:["Usuário exlcuido com sucesso."]}))
        .catch(() => res.status(500).json({errors: ["Não foi possivel completar a solicitação. Tente novamente."]}) );


    }catch{
      res.status(500).json({errors:["Não foi possivel completar a solicitação. Tente novamente."]});
    }
  };
};

export default new UserController();