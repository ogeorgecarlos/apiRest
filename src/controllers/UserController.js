import User from "../models/user";

class UserController{
  async store(req, res){
    try{
      const novoUser = await User.create(req.body);
      res.json(novoUser);
    }catch(e){
      res.status(400).json({errors: `erro de envio tente novamente: ${e.errors.map(err => err.message)}`});
      console.dir(e);
    };
  }
}

export default new UserController();