const Card = require('./card');
const Tag = require('./tag');
const List = require('./list');


List.hasMany(Card, {
    //la clé étrangère qu'on doit retrouver dans List
    foreignKey: 'list_id',
    //le nom qu'on souhaite donner aux cartes si on fait un join
    as: 'cards'
});


Card.belongsTo(List, {
    foreignKey: 'list_id',
    as: 'list'
});

Card.belongsToMany(Tag, {
    //le nom du champ de Card dans la table intermédiaire
    foreignKey: 'card_id',
    //le nom du champ de Tag dans la table intermédiaire
    otherKey: 'tag_id',
    //le nom de la propriété dans Card si on fait un join
    as: 'tags',
    //le nom de la table intermédiare
    through: 'tag_belongs_card'
});

Tag.belongsToMany(Card, {
    //le nom du champ de Tag dans la table intermédiaire
    foreignKey: 'tag_id',
    //le nom du champ de Card dans la table intermédiaire
    otherKey: 'card_id',
    //le nom de la propriété dans Tag si on fait un join
    as: 'cards',
    //le nom de la table intermédiaire
    through: 'tag_belongs_card'

});

module.exports = {
Card,
Tag,
List
}