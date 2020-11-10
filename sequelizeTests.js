require('dotenv').config();

const {List, Card, Tag} = require('./app/models');


/* List.findByPk(2,console.log); */

/* Card.findOne({
    where: {position: 1}
}).then(card => console.log(card)); */

/* Card.findAll({
    include : {association: 'tags'}
}).then(card => console.log(card)); */

/* Card.findOne({
    where: {position: 1},
    include: 'tags'
}).then(card => {
    const tag = card.tags[0];
    console.log(card.title,'qui est', tag.title)
}); */

/* List.findAll({
    include: {association: 'cards', include: [
        {association: 'tags'}
    ]}
}).then((list)=>console.log(list)); */

//Pour logger toutes les associations d'une liste même si non optimisé
/* List.findByPk(1, {
    include: {all: true, nested: true}
}).then */