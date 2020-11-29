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
        position:{
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        color: {
            type: DataTypes.STRING,
            defaultValue: '#fff'
        },
        //adding foreign key here to make sure card is linked to a list when created
        list_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    }, 
    {
        sequelize,
        tableName: 'card'
    }
);

module.exports = Card;
