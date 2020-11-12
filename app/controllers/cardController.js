const { Card } = require('../models');

const foundOptions = {

    include: {all: true, nested: true},
    order: [
        ['position', 'ASC'],
        ['cards', 'position', 'ASC']
    ]
};


const cardController = {

    showCards: async (req, res, next) => {

        try{

            const cards = await Card.findAll(foundOptions);
            res.json(cards);
        }
        catch(error){

            res.status(500).send(error);
        }
       
    
    },

    getOneCard: async (req, res, next) => {

        try {
            const cardId = parseInt(req.params.id);

            const card = await Card.findByPk(cardId, foundOptions);

            if(card){

                res.json(card);

            } else {
            
                next();
            }

        }

        catch(error){

            res.status(404).send(error);
        }

    },

    createCard: async (req, res, next) => {
        
        try { 
        
            const newCard = new Card(req.body);
            await newCard.save();
            res.json(newCard);

        }
        catch(error){

            res.status(500).send(error);
        }

    },

    updateOneCard: async (req, res, next) => {

        try {
           
        const cardId = req.params.id;

        const updatedCard = await Card.update(req.body, {
            
            where: { id: cardId}
        });

        if(updatedCard[0] === 0){

            next();
        } else {

        res.json(updatedCard[1][0]);    
        
        }

        }

        catch(error){

            res.status(500).send(error);
        }
    },

    updateCards: async (req, res, next) => {

        try {

        const cards = await Card.update(req.body, {
            where: {},
            returning: true
        });

        await cards.save();

        res.json(cards[1]);


        }

        catch(error){

            res.status(500).send(error);
        }
    },

    deleteCard: async (req, res, next) => {
    try {
    const cardId = req.params.id;
    
    const card = await Card.destroy({
        where: {id: cardId}
        
    });

    if(card === 0){

        next();
    } else {

        res.json("card successfully deleted");
    }}
    catch(error){

        res.status(500).send(error);
    }
    },

    deleteCards: async (req, res, next) => {
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