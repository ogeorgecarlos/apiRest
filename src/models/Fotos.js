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
      url:{
        type: Sequelize.VIRTUAL,
        get() {
          return `http://localhost:3001/images/${this.getDataValue("file_name")}`;
        }
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      aluno_id: Sequelize.INTEGER,
    },
    {
      sequelize,
    }
  );
  }

  static associate(models){
    this.belongsTo(models.Aluno, {foreignKey: "aluno_id"});
  }
}