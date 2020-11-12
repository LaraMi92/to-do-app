const sequelize = require('../database');
const {DataTypes, Model} = require('sequelize');

class Card extends Model {}

Card.init(
    {
        title:{
            //cannot be empty nor null 
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
            },
        position:DataTypes.INTEGER,
        color:DataTypes.STRING

    }, 
    {
        sequelize,
        tableName: 'card'
    }
);

module.exports = Card;
