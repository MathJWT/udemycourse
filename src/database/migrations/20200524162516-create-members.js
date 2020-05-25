'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('members', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'users', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            company_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'companies', key: 'id' },
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
      return queryInterface.dropTable('members');
  }
};
