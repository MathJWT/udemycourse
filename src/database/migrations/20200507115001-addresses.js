'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('addresses', { //Create it ! = as i finish, i need to set - npx sequelize db:migrate
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false, 
            reference: { model: 'alunos', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        street: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        number: {
          type: Sequelize.INTEGER,
          allowNull: false,  
        },
        neighborhood: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: new Date(),
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: new Date()
        }
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('addresses');
  }
};
