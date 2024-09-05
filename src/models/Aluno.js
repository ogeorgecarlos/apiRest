//Criando o modelo de forma "Class-based" um alternativa mais completa/complexa
//se comparada a criação de modelos com sequelize.define

import Sequelize, {Model} from "sequelize";
//importado a classe Sequelize para iniciar novas conexões
//e a classe Model para criar novos modelos.

export default class Aluno extends Model { //Criada uma nova classe de modelo herdando as caracteristicas da classe Model
  static init(sequelize){ //criando um método estatico com nome init que recebe "sequelize" como parametro
    super.init({ //chama o metodo init da classe pai
      nome: Sequelize.STRING,
      sobrenome: Sequelize.STRING,
      email: Sequelize.STRING,
      idade: Sequelize.INTEGER,
      peso: Sequelize.FLOAT,
      altura: Sequelize.FLOAT
    },
    {
      sequelize,
    });
    return this;
  }

  static associate(models){
    this.hasMany(models.Fotos),
    {
      foreignKey: "aluno_id"
    };
  }
}