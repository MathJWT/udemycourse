'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_techs', { 
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        tech_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model: 'techs', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model:'alunos', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        created_at: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        updated_at: {
            type: Sequelize.DATE,
            allowNull: false,
        }
        });
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.dropTable('user_techs');

  }
};
