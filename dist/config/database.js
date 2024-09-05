"use strict";require("dotenv").config();


module.exports = {
  dialect: "mariadb",
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  define: {
    timestamps: true, //define como true a inclusao automatica de created_at e updated_at
    underscored: true, // Autoriza a conversão de nome de coluna escrita em camelCase para snake_case
    underscoredAll: true, //Autoriza o undescored nao so para os nome das colunas, mas tambem para nome de tabelas e etc..
    //ver se o bug que justifica as config abaixo ainda existe
    "createdAt": "created_at", //sobre escreve o automático "createdAt" para snake_case
    "updatedAt": "updated_at" //sobre escreve o automático "updatedAt" para snake_case
    //****OUTRAS CONFIG POSSIVEIS:******
    //freezeTableName // sem plularização , por exemplo.
    //tableName // Definie explicitamente o nome da tabela.
    //Paranoid //Autoriza o uso de soft Delete (não hã deleção fisica, apenas a marcação de deleção)
    //indexes //Cria indidec em colunas especificas
    //hooks //Cria metodos que são acionados apos ou antes de cada ação.
    //scopes // estudar
    //classMethods //Deifnie metodos de classe (estaticos)
    //instanceMethods//Definie metodos de instancias
  },
  dialectOptions: {
    timezone: "+01:00"
  },
  timezone: "+01:00"
};

//Essas configurações geralmente são definidas globalmente para todos os modelos de um projeto, mas podem ser sobrescritas individualmente em cada modelo, se necessário.