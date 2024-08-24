import Aluno from "../models/Aluno";

class HomeController{
  async index(req, res){
    try{
      const novoAluno = await Aluno.create({
        nome: "Maria",
        sobrenome: "Luiza",
        email: "Marialuiza@live.com",
        idade: 30,
        peso: 57,
        altura: 1.56,
      });
      res.json(novoAluno);
    }catch(e){
      console.log(e.message);
    };
  }
}

export default new HomeController();