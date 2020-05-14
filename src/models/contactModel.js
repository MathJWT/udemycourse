const Sequelize = require('sequelize');

class Contact extends Sequelize.Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            cellphone: Sequelize.STRING,
        },{
            sequelize,
            tableName: 'contacts'
        });
        return this;
    };

    static Associate(models) {
        this.belongsTo(models.Aluno, {
            foreignKey: 'user_id',
            through: 'user_contacts',
            as: 'users'
        });
    }
}

module.exports = Contact;