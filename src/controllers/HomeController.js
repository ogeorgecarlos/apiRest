import Professor from "../models/professor";

class HomeController{
  async index(req, res){
    try{
      const novoProfessor = await Professor.create({
        nome: "Angela",
        sobrenome: "Maria",
        email: "Angelamaria@live.com",
        telefone: 85,
        disciplina: "Matematica"
      });
      res.json(novoProfessor);
    }catch(e){
      console.log(e.message);
    };
  }
}

export default new HomeController();