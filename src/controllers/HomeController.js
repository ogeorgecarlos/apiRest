import Aluno from "../models/Aluno";

class HomeController{
  async index(req, res){
    try{
      const novoAluno = await Aluno.create({
        nome: "Angela",
        sobrenome: "Maria",
        email: "Angelamaria@live.com",
        idade: 20,
        peso: 85,
        altura: 1.80,
      });
      res.json(novoAluno);
    }catch(e){
      console.log(e.message);
    };
  }
}

export default new HomeController();