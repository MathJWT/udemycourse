'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('pictures', { 
            id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                primaryKey: true,
                autoIncrement: true,
            },
            originalname: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            filename: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            patient_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {model: 'patients', key: 'id'},
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
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
