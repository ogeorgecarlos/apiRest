"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }//Criando o modelo de forma "Class-based" um alternativa mais completa/complexa
//se comparada a criação de modelos com sequelize.define

var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
//importado a classe Sequelize para iniciar novas conexões
//e a classe Model para criar novos modelos.

 class Aluno extends _sequelize.Model { //Criada uma nova classe de modelo herdando as caracteristicas da classe Model
  static init(sequelize){ //criando um método estatico com nome init que recebe "sequelize" como parametro
    super.init({ //chama o metodo init da classe pai
      nome: _sequelize2.default.STRING,
      sobrenome: _sequelize2.default.STRING,
      email: _sequelize2.default.STRING,
      idade: _sequelize2.default.INTEGER,
      peso: _sequelize2.default.FLOAT,
      altura: _sequelize2.default.FLOAT
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
} exports.default = Aluno;