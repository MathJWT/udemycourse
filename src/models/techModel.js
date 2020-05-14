const Sequelize = require('sequelize');

class Tech extends Sequelize.Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
        },{
            sequelize,
            tableName: 'techs'
        });
        return this;
    };

    static Associate(models) {
        this.belongsToMany(models.Aluno, {
            foreignKey: 'tech_id',
            through: 'user_techs', // Tabela pivô
            as: 'users' // Association name
        })    
    }
}

module.exports = Tech;