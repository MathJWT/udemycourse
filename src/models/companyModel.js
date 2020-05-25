const Sequelize = require('sequelize');

class Company extends Sequelize.Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
        },{
            tableName: 'companies',
            sequelize,
            paranoid: true,
            modelName: 'companies',
        });
        return this;
    };

    static Associate(models) {
        this.belongsToMany(models.users, { foreignKey: 'company_id', through: 'members', as: 'users' })
        this.hasMany(models.patients, {foreignKey: 'company_id', as: 'company-patients'})
    }

}

module.exports = Company;