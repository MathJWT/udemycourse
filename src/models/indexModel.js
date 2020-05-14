const { Model, DataTypes } = require('sequelize');

class Aluno extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            age: DataTypes.INTEGER,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
        }, {
            sequelize,
        });
        return this;
    }
}


module.exports = Aluno