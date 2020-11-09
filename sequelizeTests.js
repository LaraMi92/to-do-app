const {List, Card, Tag} = require('./app/models');


/* List.findByPk(2,console.log); */

Card.findOne({
    where: {position: 1}
}).then(card => console.log(card));