const { Tag } = require('../models');

const tagController = {

    showTags: async (req, res, next) => {

        try {

            const tags = await Tag.findAll();
            res.json(tags);
        }
        catch (error){

            res.status(500).send(error);
        }
       
    
    },

    getOneTag: async (req, res, next) => {

        try {

            const tagId = parseInt(req.params.id);

            const tag = await Tag.findByPk(tagId);

            res.json(tag);

        }

        catch(error){

            res.status(404).send(error);
        }
    },

    createTag: async (req, res, next) => {

        try {

            const newTag = new Tag(req.body);

            await newTag.save();
            res.json(newTag);

        }
        catch(error){

            res.status(500).send(error);

        }

    },

    updateOneTag: async (req, res, next) => {

        try {
        const tagId = req.params.id;

        const updatedTag = await Tag.update(req.body, {
            where: { id: tagId }
        });

        await updatedTag.save();

        if(updatedTag[0] == 0){

            next();
            
        } else {

            res.json(updatedTag[1][0]);
        }

        }
        catch(error) {

            res.status(500).send(error);
        }
    },

    updateTags: async (req, res, next) => {

        try {
        
        const tags = await Tag.update(req.body, {
            where: {},
            returning: true
        });

        await tags.save();

        res.json(tags[1]);


        }
        catch(error){

            res.status(500).send(error);
        }

    },

    deleteTag: async (req, res, next) => {

        try{

            const tagId = req.params.id;

            const tag = await Tag.destroy({
                where: {id : tagId} 
            });

            if(tag == 0){

                next();
                
            } else {

                res.json("tag successfully deleted");
            }

        }
        catch(error){

            res.status(500).send(error);
        }
    },

    deleteTags: async (req, res, next) => {

        try{
            const tags = await Tag.destroy({
                truncate:{ cascade: true }
            });

            if(!tags){
                res.json("all tags successfully deleted");
            }

        }
        catch(error){
            res.status(500).send(error);
        }
    }

}

module.exports = tagController;