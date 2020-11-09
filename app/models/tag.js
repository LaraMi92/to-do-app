const sequelize = require('../../database');
const {DataTypes, Model} = require('sequelize');

class Tag extends Model {}

Tag.init(
    {
        title: DataTypes.STRING,
        color:DataTypes.INTEGER

    }, 
    {
        sequelize,
        tableName: 'tag'
    }
);

module.exports = Tag;