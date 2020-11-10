const { List, Tag, Card } = require('../models');

const listController = {

    showLists: async (req, res) => {

        try{

            const lists = await List.findAll();
            res.json({lists})
        }
        catch(error){

            res.status(500).send(error);
        }
       

    },

    getOneList: async (req, res) => {

        try {
            const listId = parseInt(req.params.id);

            const list = await List.findByPk(listId, {
                include:{association: 'cards', include: [
                    {association: 'tags'}
                ]}
            });

            res.json({list});

        }
        catch(error){

            res.status(404).send(error);

        }


    },

    createList: async (req, res) => {

        try {

            const newList = new List({
            title: req.body.title,
            position: req.body.position
        });

        await newList.save();
        res.json({newList});

        }
        catch(error){

            res.status(500).send(error);
        }

    }

}

module.exports = listController;