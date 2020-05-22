'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('insurances', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            plan: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: 'BASIC'
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
        return queryInterface.dropTable('insurances');
  }
};
