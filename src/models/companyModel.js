const Sequelize = require('sequelize');

class Company extends Sequelize.Model {
    consctructor(body) {
        this.body = body;
    }
    
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
        },{
            tableName: 'companies',
            sequelize,
            paranoid: true,
        });
        return this;
    };

    static Associate(models) {
        this.belongsToMany(models.User, { foreignKey: 'company_id', through: 'members', as: 'users' })
    }

}

module.exports = Company;