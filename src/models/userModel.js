const Sequelize = require('sequelize');
const bcrypt = require("bcrypt");

class User extends Sequelize.Model {

    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            age: Sequelize.INTEGER,
            email: Sequelize.STRING,
            password: Sequelize.STRING,
        },{
            sequelize,
            paranoid: true,
            tableName: 'users',
            modelName: 'users'
        });
        return this;
    };

    static Associate(models) {
        this.belongsToMany(models.companies, { foreignKey: 'user_id', through: 'members', as: 'companies' })
    }

    comparePassword(password, hashedPassword) {
        const compare = bcrypt.compareSync(password, hashedPassword);
        return compare;
    };

    passwordHash(password) {
        const userPassword = password;
        const salt = bcrypt.genSaltSync(); 
        const hashPassword = bcrypt.hashSync(userPassword, salt);
        return hashPassword;
    };
};

module.exports = User;