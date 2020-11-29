const { Card, Tag } = require('../models');

const mixinsController = {

    associate : async (req, res, next) => {

        try {
        
            const cardid = req.params.cardid;
            const tagid = req.params.tagid;
     
            const card = await Card.findByPk(cardid);
            const tag = await Tag.findByPk(tagid);
        
            //apply add method

            if(card && tag){

                const association = await card.addTag(tag);

                    if(association){
                    
                    res.json("tag was added to card");
    
                    }
            } else {

                next();
            }
        
        } catch(error){

            res.json({"error": error.message})
        }

    },

    dissociate : async (req, res, next) => {

        try {

            const cardid = req.params.cardid;
            const tagid = req.params.tagid;
        
            const card = await Card.findByPk(cardid);
            const tag = await Tag.findByPk(tagid);

            if(card && tag){
        
                const dissociate = await card.removeTag(tag);

                    if (!dissociate){

                        res.json("tag was removed from card");

                    }} else {

                        next();
                    }
        }

        catch(error){

            res.json({"error": error.message})

        }

    }

};

module.exports = mixinsController;