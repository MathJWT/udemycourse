const Sequelize = require('sequelize');
const bcrypt = require("bcrypt")

class Aluno extends Sequelize.Model {
    consctructor(body) {
        this.body = body;
    }
    
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            age: Sequelize.INTEGER,
            email: Sequelize.STRING,
            password: Sequelize.STRING,
        },{
            sequelize,
        });
        return this;
    };

    static Associate(models) {
        this.hasMany(models.Address, {
            foreignKey: 'user_id',
            as: 'addresses'
        });
        this.belongsToMany(models.Tech, {
            foreignKey: 'user_id',
            through: 'user_techs',
            as: 'tech'
        });
        this.hasMany(models.Contact, {
            foreignKey: 'user_id',
            as: 'contacts'
        })

    }

    passwordHash(password) {
        const userPassword = password;
        const salt = bcrypt.genSaltSync();
        const hashPassword = bcrypt.hashSync(userPassword, salt);
        return hashPassword
    }
}

module.exports = Aluno;