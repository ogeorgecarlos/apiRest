'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.changeColumn('alunos', "email",
      {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true,
        validate:{
          isEmail:{
            msg: "Email já cadastrado."
          }
        }
      }
    );

  },

  async down (queryInterface) {
    await queryInterface.dropTable('users');
  }
};
