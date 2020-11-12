const sequelize = require('../database');
const {DataTypes, Model} = require('sequelize');

class Tag extends Model {}

Tag.init(
    {
        title:{
            //cannot be empty nor null 
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
            },
        color:DataTypes.INTEGER

    }, 
    {
        sequelize,
        tableName: 'tag'
    }
);

module.exports = Tag;