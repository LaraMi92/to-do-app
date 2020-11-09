const sequelize = require('../../database');
const {DataTypes, Model} = require('sequelize');

class Tag extends Model {}

Tag.init(
    {
        title: DataTypes.STRING,
        color:DataTypes.INTEGER,
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
        tableName: 'tag'
    }
);

module.exports = Tag;