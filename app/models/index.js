const Card = require('./card');
const Tag = require('./tag');
const List = require('./list');


List.hasMany(Card, {
    foreignKey: 'list_id',
    as: 'cards'
});


Card.belongsTo(List, {
    foreignKey: 'list_id',
    as: 'list'
});

Card.belongsToMany(Tag, {
    foreignKey: 'card_id',
    otherKey: 'tag_id',
    as: 'tags',
    through: 'tag_belongs_card'
});

Tag.belongsToMany(Card, {
    foreignKey: 'tag_id',
    otherKey: 'card_id',
    as: 'cards',
    through: 'tag_belongs_card'
});

module.exports = {
Card,
Tag,
List
}