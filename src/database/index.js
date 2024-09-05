//Este é, FINALMENTE, o arquivo que inicializa minha conexão com a base de dados
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

import Sequelize from "sequelize";
import databaseConfig from "../config/database";
import Aluno from "../models/Aluno";
import Professor from "../models/professor";
import User from "../models/user";
import Fotos from "../models/Fotos";


const models = [Aluno, Professor, User, Fotos];

const connection = new Sequelize(databaseConfig); //Iniciar conexão com base dados

models.forEach(model =>model.init(connection)); //Para cada modelo presente no array de models, iniciar um conexão.
models.forEach(model => {
  model.associate && model.associate(connection.models);
});
