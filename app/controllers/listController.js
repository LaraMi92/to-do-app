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

    },

    updateLists: async (req, res) => {

        try {


            const updatedLists = await List.update({
                    title: req.body.title,
                    position: req.body.position
                }, {
                    where: {}
                });
            
            await updatedLists.save();
            
            console.log({updatedLists});
            res.json({updatedLists});

        }

        catch(error){

            res.status(500).send(error);

        }

    },

    updateOneList: async (req, res) => {

        try {

            const listId = req.params.id;

            const updatedList = await List.update({
                title : req.body.title,
                position: req.body.position },
                {
                    where: {
                        id: listId
                    }
                  
            });

            res.json({updatedList});

        }
        catch(error){

            res.status(500).send(error);
        }
    },

    deleteLists: async (req, res) => {
        try{

        const lists = await List.destroy({
            
            truncate: { cascade: true }
        });

        if(!lists){

            res.json("all lists successfully deleted");
        }
        }
        catch(error){
            res.status(500).send(error);
        }
    },

    deleteList: async (req, res) => {

        try{
        
        const listId = req.params.id;

        const list = await List.destroy({
            

            where: {id : listId},
            include: [{all: true, nested: true}]
            
            
        });

        if(!list){
            res.json("list successfully deleted");
        }
        }
        catch(error){

        res.status(500).send(error);

        }

    }

}

module.exports = listController;