let errorsHTTP = require('../app/errorsHTTP.js')();
let middleWareStripe = require('../src/middleware/middleware-stripe.js');

module.exports = (app) => {

    app.route("/toto54")
        .get((req,res) => {
            res.send("hello c'est moi")
        })
        .all(errorsHTTP.error405);

    app.route("/create-checkout-session")
        .post(middleWareStripe)
        .all(errorsHTTP.error405);

/************************ PARCOUR DE TOUTE LES ROUTES ET GENERATION DUNE ERREUR 404 SI ERREUR405 PAS TROUVER ***********************************/
// Erreur 404
    app.route("*").all(errorsHTTP.error404);
};
