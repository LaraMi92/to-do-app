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

    }

}

module.exports = cardController;