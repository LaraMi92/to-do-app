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

    }

}

module.exports = tagController;