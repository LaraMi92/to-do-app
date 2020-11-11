const { List, Tag, Card } = require('../models');

const cardController = {

    showCards: async (req, res) => {

        try{

            const cards = await Card.findAll();
            res.json({cards});
        }
        catch(error){

            res.status(500).send(error);
        }
       
    
    },

    getOneCard: async (req, res) => {

        try {
            const cardId = parseInt(req.params.id);

            const card = await Card.findByPk(cardId, {
                include: {association: 'tags'}
            });

            res.json({card});

        }

        catch(error){

            res.status(404).send(error);
        }

    },

    createCard: async (req, res) => {
        
        try { 
        
            const newCard = new Card({
                title: req.body.title,
                position: req.body.position,
                color: req.body.color
            });

            await newCard.save();
            res.json({newCard});

        }
        catch(error){

            res.status(500).send(error);
        }

    },

    updateOneCard: async (req, res) => {

        try {
           
        const cardId = req.params.id;

        const updatedCard = await Card.update({
            title: req.body.title,
            position: req.body.position,
            color: req.body.color
        }, {
            where: { id: cardId}
        });

        res.json({updatedCard});    


        }

        catch(error){

            res.status(500).send(error);
        }
    },

    updateCards: async (req, res) => {

        try {

        const cards = await Card.update({
            title: req.body.title,
            position: req.body.position,
            color: req.body.color
        }, {
            where: {}
        });

        await cards.save();

        res.json({cards});


        }

        catch(error){

            res.status(500).send(error);
        }
    },

    deleteCard: async (req, res) => {
    try{
    const cardId = req.params.id;
    
    const card = await Card.destroy({
        where: {id: cardId},
        include: [{all: true, nested: true}]
    });

    if(!card){

        res.json("card successfully deleted");
    }}
    catch(error){

        res.status(500).send(error);
    }
    },

    deleteCards: async (req, res) => {
        try {
            const cards = await Card.destroy({
                truncate: { cascade: true }
            });

            if(!cards){
                res.json("all cards successfully deleted");
            }

        }
        catch(error){

            res.status(500).send(error);
        }
    }

}

module.exports = cardController;