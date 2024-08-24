import Sequelize, {Model} from "sequelize";

export default class Professor extends Model{
  static init(sequelize){
    super.init({
      nome: Sequelize.STRING,
      sobrenome: Sequelize.STRING,
      email: Sequelize.STRING,
      telefone: Sequelize.INTEGER,
      disciplina: Sequelize.STRING
    },
    {sequelize}
  );
    return this;
  };
};