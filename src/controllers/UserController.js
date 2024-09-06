import User from "../models/user";
import {error, success} from "../utils/error_success_func";

class UserController{

  //create
  async store(req, res){
    try{
      const body = req.body;
      if(!body) return res.status(412).json(error("É necessário enviar dados para inclusão do usuário"));

      const {email} = body;
      if(!email) res.status(412).json(error("Informe o email que deseja cadastrar na base de dados."));
      const userExists = await User.findOne({where:{email}});
      if(userExists) return res.status(404).json(error("usuario já existe."));

      User.create(body)
        .then(() =>res.status(201).json(success("Usuário criado com sucesso.")))
        .catch( () => {
          res.status(500).json(error(`Não foi possivel realizar a aoperação`));
        });


    }catch(e){
      if(e.message.endsWith("is not valid JSON"))
        return res.status(401).json(error("O objeto enviado deve estar no formato JSON"));

      res.status(500).json(error("Não foi possivel processar a solicitação. Tente Novamente."));
    };
  }

  //read one
  async show(req, res){
    try{
      const emailUser = req.email;

      if(!emailUser) return res.status(412).json(error("É necessário enviar um email para consulta."));

      const user = await User.findOne({where:{email: emailUser}, attributes:["id", "nome", "email"]});

      if(!user) return res.status(404).json(error("Usuário não localizado"));
      return res.status(200).json(user);

    }catch(e){
      if(e.message.endsWith("is not valid JSON"))
        return res.status(401).json(error("O objeto enviado deve estar no formato JSON"));

      res.status(500).json(error("Não foi possivel processar a solicitação. Tente Novamente."));

    }
  };

  async index(req, res){
    try{
      const users = await User.findAll({attributes: ["id", "nome", "email"]});
      res.status(200).json(users);
    }catch{
      res.status(500).json(error("Não foi possivel processar a solicitação. Tente Novamente."));
    };
  };

  //update
  async update(req, res){
    try{

      const body = req.body;
      if(!body) return res.status(412).json(error("É necessário enviar dados para prosseguir com a solicitação"));

      const {novoNome, novoEmail, novoPassword} = req.body;
      if(!novoNome && !novoEmail && !novoPassword) return res.status(412).json(error("Não foram enviados dados para alteração."));

      const email = req.email;
      const user = await User.findOne({where:{email}});
      if(!user)
        return res.status(404).json(error(`Nenhum usuário localizado com o email ${req.email}`));

      user.nome = req.body.novoNome || user.nome;
      user.email = req.body.novoEmail || req.body.email;
      user.password = req.body.novoPassword || req.body.password;
      user.save();

      return res.status(201).json(success("User atualizado com sucesso"));

    }catch{
      res.status(500).json(error("Não foi possivel processar a solicitação. Tente Novamente."));
    };
  };

  async delete(req, res){
    try{
      const userId = req.id;
      if(!userId) return res.status(412).json(error("E necessário enviar um userId."));

      const user = await User.findByPk(userId);
      if(!user) return res.status(404).json(error("Não foi localizado usuários com o id informado."));

      await user.destroy()
        .then(() => res.status(200).json(success("Usuário exlcuido com sucesso.")))
        .catch(() => res.status(500).json(error("Não foi possivel completar a solicitação. Tente novamente.")));


    }catch{
      res.status(500).json(error("Não foi possivel completar a solicitação. Tente novamente."));
    }
  };
};

export default new UserController();