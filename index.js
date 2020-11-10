/** Tous les require en haut du fichier ! */
require('dotenv').config();
const express = require('express');
const router = require('./app/router');


/** créer un serveur express */
const app = express();

/** on rajoute le middleware pour la gestion des données POST */
app.use( express.urlencoded({extended: true}) );


/** Routage */
app.use(router);


/** lancement du serveur */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});