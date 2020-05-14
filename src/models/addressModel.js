const Sequelize = require('sequelize');

class Address extends Sequelize.Model {
    static init(sequelize) {
        super.init({
            street: Sequelize.STRING,
            number: Sequelize.INTEGER,
            neighborhood: Sequelize.STRING,
            user_id: Sequelize.INTEGER,
        },{
            sequelize,
        });
        return this;
    };

    static Associate(models) {
        this.belongsTo(models.Aluno, {
            foreignKey: 'user_id',
            as: 'aluno'
        })    
    }
}

module.exports = Address;