
const express = require('express');
const listController = require('./controllers/listController');
const cardController = require('./controllers/cardController');
const tagController = require('./controllers/tagController');

const router = express.Router();

//get all routes

router.get('/list', listController.showLists);
router.get('/tag', tagController.showTags);
router.get('/card', cardController.showCards);

//get one routes

router.get('/list/:id', listController.getOneList);
router.get('/card/:id', cardController.getOneCard);
router.get('/tag/:id', tagController.getOneTag);

//post routes
router.post('/list', listController.createList);
router.post('/card', cardController.createCard);
router.post('/tag', tagController.createTag);

//patch routes for all
router.patch('/list', listController.updateLists); 
router.patch('/card', cardController.updateCards);
router.patch('/tag', tagController.updateTags);

//patch routes for one
router.patch('/list/:id', listController.updateOneList);
router.patch('/card/:id', cardController.updateOneCard);
router.patch('/tag/:id', tagController.updateOneTag);

//delete one
router.delete('/list/:id', listController.deleteList);
router.delete('/card/:id', cardController.deleteCard);
router.delete('/tag/:id', tagController.deleteTag);

//delete all
router.delete('/list', listController.deleteLists);
router.delete('/card', cardController.deleteCards);
router.delete('/tag', tagController.deleteTags);

module.exports = router;