
const { List } = require('../models');

const foundOptions = {
    
        include: {all: true, nested: true},
        order: [['position', 'ASC'],
        ['cards', 'position', 'ASC']]
    
};

const listController = {

    showLists: async (req, res, next) => {

        try{

            const lists = await List.findAll(foundOptions);

            res.json(lists);
        }
        catch(error){

            res.status(500).json({"error": error.message});
        }
       

    },

    getOneList: async (req, res, next) => {

        try {
            const listId = parseInt(req.params.id);

            const list = await List.findByPk(listId, foundOptions);

            if (list) {
                res.json(list);
            } else {
                next();
            }

        }
        catch(error){

            res.status(500).send({"error": error.message});

        }


    },

    createList: async (req, res, next) => {

        try {

            const newList = new List(req.body);
            await newList.save();
            res.json(newList);

        }
        catch(error){

            res.status(500).send({"error": error.message});
        }

    },

    updateLists: async (req, res) => {

        try {


            const updatedLists = await List.update(req.body, {
                    where: {},
                    returning: true
                });
            
            await updatedLists.save();
            
            console.log(updatedLists);
            res.json(updatedLists[1]);

        }

        catch(error){

            res.status(500).send({"error": error.message});

        }

    },

    updateOneList: async (req, res, next) => {

        try {

            const listId = req.params.id;

            const updatedList = await List.update(req.body,
                {
                    where: {
                        id: listId
                    },
                    returning: true
                  
            });

            if(updatedList[0]== 0){
                
                next();

            } else {

                res.json(updatedList[1][0]);
            }

        }
        catch(error){

            res.status(500).send({"error": error.message});
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

            res.status(500).send({"error": error.message});
        }
    },

    deleteList: async (req, res, next) => {

        try{
        
        const listId = req.params.id;

        const list = await List.destroy({
            
            where: {id : listId}
            
        });

        if(list === 0){

            next();
            
        } else {

            res.json("list successfully deleted");
            
        }
        }
        catch(error){

            res.status(500).send({"error": error.message});

        }

    }

}

module.exports = listController;