'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('fotos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      original_name:{
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
          len:[1, 50],
          msg: "The pic's name is too big."
        },
      },

      file_name:{
        type: Sequelize.STRING,
        allowNull: false,
        unique:true,
      },

      created_at:{
        type: Sequelize.DATE,
        allowNull: false,
       //autoIncrement: true "pq o autoincrement da erro aqui?"
      },

      updated_at:{
        type: Sequelize.DATE,
        allowNull: false,
        //autoIncrement: true "pq o autoincrement da erro aqui?"
      },

      aluno_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:"alunos",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",

      },
    });

  },

  async down (queryInterface) {
    await queryInterface.dropTable('fotos');
  }
};
