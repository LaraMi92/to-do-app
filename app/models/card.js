const sequelize = require('../../database');
const {DataTypes, Model} = require('sequelize');

class Card extends Model {}

Card.init(
    {
        title: DataTypes.STRING,
        position:DataTypes.INTEGER,
        color:DataTypes.STRING,
        created_at: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
          },
          updated_at: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
          }

    }, 
    {
        sequelize,
        tableName: 'card'
    }
);

module.exports = Card;