'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {    
      return queryInterface.createTable('companies', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING,
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
      return queryInterface.dropTable('companies');
  }
};
