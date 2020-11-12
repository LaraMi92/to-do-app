const { Card, Tag } = require('../models');

const mixinsController = {

    associate : async (req, res, next) => {
        
        try {
        //gather both ids
        const cardid = req.params.cardid;
        const tagid = req.params.tagid;
        //find instances through id
        const card = await Card.findByPk(cardid);
        const tag = await Tag.findByPk(tagid);
        //apply add method
        const association = await card.addTag(tag);

        if(association){

            res.json("tag was added to card");

        } else {

            next();
        }
        
        } catch(error){

        res.json({"error": error.message})
        }

    },

    dissociate : async (req, res, next) => {

        try {

        //gather both ids
        const cardid = req.params.cardid;
        const tagid = req.params.tagid;
        //find instances through id
        const card = await Card.findByPk(cardid);
        const tag = await Tag.findByPk(tagid);
        //remove association
        const dissociate = await card.removeTag(tag);

        if (!dissociate){
        res.json("tag was removed from card");

        } else {

            next();
        }
        }

        catch(error){

            res.json({"error": error.message})

        }

    }

};

module.exports = mixinsController;