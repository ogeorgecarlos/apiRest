"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }//Este é, FINALMENTE, o arquivo que inicializa minha conexão com a base de dados
// aqui há tres momentos
// 1 - instanciação de uma nova conexão com o sequelize
// 2 - passagem da configuração para essa nova instancia
// 3 - Iniciação das classe modelos na conexão estabelecida
// 4 - inclusão das associações para o  objeto model.

//interessante perceber:
//O objeto connection é uma serie de configurações que inclui as configurações que definimos nos arquivos de configuração.
// O Modelo importado antes da aplicaçãp do metodo "init" que o associa a base de dados, é vazio. Nao possui propriedades e nem valores.
// O modelo importado , apos a aplicacao do "init", passa a conter varias propriedades e valores que  o conectão a base de dados.
// O modelos antes da aplicaca do meto de associacao com duas associações, posssui sua propriedade "associations" vazia.
// os modelos apos acplicar o metodo de associacao, passa a ter como valor da sua propriedade "associations" um objeto com todas as suas relaões.

var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);
var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _professor = require('../models/professor'); var _professor2 = _interopRequireDefault(_professor);
var _user = require('../models/user'); var _user2 = _interopRequireDefault(_user);
var _Fotos = require('../models/Fotos'); var _Fotos2 = _interopRequireDefault(_Fotos);


const models = [_Aluno2.default, _professor2.default, _user2.default, _Fotos2.default];

const connection = new (0, _sequelize2.default)(_database2.default); //Iniciar conexão com base dados

models.forEach(model =>model.init(connection)); //Para cada modelo presente no array de models, iniciar um conexão.
models.forEach(model => {
  model.associate && model.associate(connection.models);
});
