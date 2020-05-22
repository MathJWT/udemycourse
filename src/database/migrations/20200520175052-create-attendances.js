'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('attendances', { 
          id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
            },
            procedure: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            price: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            patient_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'patients', key: 'id' }
            },
            date: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: new Date()
            },
            insurance_id: {
                allowNull: true,
                type: Sequelize.INTEGER,
                references: { model: 'insurance', key: 'id' },
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
      return queryInterface.dropTable('attendances');
    },
};
