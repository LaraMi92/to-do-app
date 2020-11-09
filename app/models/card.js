const sequelize = require('../../database');
const {DataTypes, Model} = require('sequelize');

class Card extends Model {}

Card.init(
    {
        title: DataTypes.STRING,
        position:DataTypes.INTEGER,
        color:DataTypes.STRING

    }, 
    {
        sequelize,
        tableName: 'card'
    }
);

module.exports = Card;