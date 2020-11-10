
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

module.exports = router;