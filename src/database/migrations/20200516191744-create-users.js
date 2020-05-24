'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('users', { //Create: = as i finish, i need to set - npx sequelize db:migrate
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        age: {
          type: Sequelize.INTEGER,
          allowNull: false,  
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        created_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: new Date(),
        },
        updated_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: new Date()
        },
        deleted_at: {
            allowNull: true,
            type: Sequelize.DATE,
            defaultValue: null,
        }
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('users');
  }
};
