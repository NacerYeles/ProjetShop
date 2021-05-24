'use strict';
var path = require('path');
var express = require('express');
var app = express();
const bodyParser = require('body-parser');
require('dotenv').config()

//--------------------------------------------------------------------
//      Mise en place du Body Parser
//--------------------------------------------------------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//--------------------------------------------------------------------
//      Chargement des routes
//--------------------------------------------------------------------
require('./app/routes')(app);

//--------------------------------------------------------------------
//      Mise en place du répertoire static
//--------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));

//--------------------------------------------------------------------
//     Ecoute du serveur HTTP
//--------------------------------------------------------------------
app.listen(5050,() => {
    console.log(`Le serveur est démarré : http://localhost:${5050}`);
});

// pour avoir acces au variable d'environement dans mon fichier env avec cley valeur exemple : {API_KEY: 'toto'}
// const result = require('dotenv').config();

// if (result.error) {
//     throw result.error
// }

// console.log(result.parsed)

// pour avoir acces au variable d'environement dans mon fichier env seulement la valeur dans ma variable API_KEY exemple : toto