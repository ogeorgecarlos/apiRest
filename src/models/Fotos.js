import Sequelize, {Model} from "sequelize";

export default class Fotos extends Model{
  static init(sequelize){
    super.init(
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true, //tive que incluir o campo primaryKey
      },
      original_name: Sequelize.STRING,
      file_name: Sequelize.STRING,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      aluno_id: Sequelize.INTEGER,
    },
    {sequelize}
  );
  }
}