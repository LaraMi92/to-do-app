const { List, Tag, Card } = require('../models');

const tagController = {

    showTags: async (req, res) => {

        try {

            const tags = await Tag.findAll();
            res.json({tags});
        }
        catch (error){

            res.status(500).send(error);
        }
       
    
    },

    getOneTag: async (req, res) => {

        try {

            const tagId = parseInt(req.params.id);

            const tag = await Tag.findByPk(tagId);

            res.json({tag});

        }

        catch(error){

            res.status(404).send(error);
        }
    },

    createTag: async (req, res) => {

        try {

            const newTag = new Tag({

                title: req.body.title,
                color: req.body.color
            });

            await newTag.save();
            res.json({newTag});

        }
        catch(error){

            res.status(500).send(error);

        }

    },

    updateOneTag: async (req, res) => {

        try {
        const tagId = req.params.id;

        const updatedTag = await Tag.update({
            title: req.body.title,
            color: req.body.color
        }, {
            where: { id: tagId}
        });

        res.json({updatedTag});


        }
        catch(error) {

            res.status(500).send(error);
        }
    },

    updateTags: async (req, res) => {

        try {
        
        const tags = await Tag.update({
            title: req.body.title,
            color: req.body.color
        }, {
            where: {}
        });

        await tags.save();

        res.json({tags});


        }
        catch(error){

            res.status(500).send(error);
        }

    },

    deleteTag: async (req, res) => {

        try{

            const tagId = req.params.id;

            const tag = await Tag.destroy({
                where: {id : tagId},
                include: [{all: true, nested: true}]
            });

            if(!tag){

                res.json("tag successfully deleted");
            }

        }
        catch(error){

            res.status(500).send(error);
        }
    },

    deleteTags: async (req, res) => {

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