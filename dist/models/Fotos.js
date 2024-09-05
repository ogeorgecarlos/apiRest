"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _appConfig = require('../config/appConfig'); var _appConfig2 = _interopRequireDefault(_appConfig);

 class Fotos extends _sequelize.Model{
  static init(sequelize){
    super.init(
    {
      id: {
        type: _sequelize2.default.INTEGER,
        primaryKey: true, //tive que incluir o campo primaryKey
      },
      original_name: _sequelize2.default.STRING,
      file_name: _sequelize2.default.STRING,
      url:{
        type: _sequelize2.default.VIRTUAL,
        get() {
          return `${_appConfig2.default.urlProd}/images/${this.getDataValue("file_name")}`;
        }
      },
      created_at: _sequelize2.default.DATE,
      updated_at: _sequelize2.default.DATE,
      aluno_id: _sequelize2.default.INTEGER,
    },
    {
      sequelize,
    }
  );
  }

  static associate(models){
    this.belongsTo(models.Aluno, {foreignKey: "aluno_id"});
  }
} exports.default = Fotos;