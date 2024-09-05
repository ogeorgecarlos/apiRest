"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class Professor extends _sequelize.Model{
  static init(sequelize){
    super.init({
      nome: _sequelize2.default.STRING,
      sobrenome: _sequelize2.default.STRING,
      email: _sequelize2.default.STRING,
      telefone: _sequelize2.default.INTEGER,
      disciplina: _sequelize2.default.STRING
    },
    {sequelize}
  );
    return this;
  };
} exports.default = Professor;;