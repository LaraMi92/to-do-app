/*require */
require('dotenv').config();
const express = require('express');
const router = require('./app/router');


/** create server */
const app = express();

/** POST */
app.use( express.urlencoded({extended: true}) );


/** Router */
app.use(router);


/** launch server */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});