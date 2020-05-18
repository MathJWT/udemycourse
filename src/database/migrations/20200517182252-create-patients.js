'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('patients', { 
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: true
            },
            cpf: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            age: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            company_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: { model: 'companies', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
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
    return queryInterface.dropTable('patients');
  }
};
