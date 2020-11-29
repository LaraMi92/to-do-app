
/*requires */

require('dotenv').config();
const express = require('express');
const router = require('./app/router');
const cors = require('cors');
const multer = require('multer');


/** create server */

const app = express();


/**use multer */

const bodyParser= multer();
app.use( bodyParser.none() );

//authorize access to api through other domains

app.use(cors({
    origin: '*',
    methods: 'GET,POST,PATCH,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type'
}));

/** POST */
app.use( express.urlencoded({extended: true}) );


/** Router */
app.use(router);


/** launch server */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});