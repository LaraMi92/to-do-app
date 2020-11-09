const sequelize = require('../../database');
const {DataTypes, Model} = require('sequelize');

class List extends Model {}

List.init(
    {
        title: DataTypes.STRING,
        position:DataTypes.INTEGER,
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
        tableName: 'list'
    }
);

module.exports = List;