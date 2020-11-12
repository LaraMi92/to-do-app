const sequelize = require('../database');
const {DataTypes, Model} = require('sequelize');

class List extends Model {}

List.init(
    {
        title:{
            //cannot be empty nor null 
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
            },
        position:DataTypes.INTEGER

    }, 
    {
        sequelize,
        tableName: 'list'
    }
);

module.exports = List;