import Sequelize, {Model} from "sequelize";
import appConfig from "../config/appConfig";

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
          return `${appConfig.urlProd}/images/${this.getDataValue("file_name")}`;
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