/**####IMPORTANTE####**/
/** ESTE ES UN MIDDLEWARE DE APLICACIÓN GLOBAL**/

const db = require("../database/models");
const users = db.User

function userLoggedMiddleware(req, res, next) {
    console.log('En userLoggedMiddlware')
    // 1 - Res.locals son variables que se comparten en todas las vistas sin importar el controlador.
    res.locals.isLogged = false; // 1.1 -  La inicializo como falso

    /***2 - Gestión de cookies ANTES de aplicar session***/
    // 2.1 - Guarda el mail que está en la cookie
    let emailInCookie = req.cookies.userEmail;

    // 3 - Chequea si existe un email guardado en cookie
    if (emailInCookie != undefined) {
        // 3.2 - Si existe, lo busca
        db.User.findOne({ where: { email: emailInCookie } })
            .then(userFromCookie => {
                // 3.3 - Chequea si el dato que encuentra es distinto de null
                if (userFromCookie != null) {
                    // 3.4 - Si existe, entonces lo guarda en session
                    req.session.userLogged = userFromCookie;
                }
                // 3.5 - Chequa si existe usuario en sessión y ademas si existe
                if (req.session && req.session.userLogged) {
                    // 3.6 - Si existe, modifica el valor de "isLogged" a true y asigna a la variable local el usuario logueado
                    res.locals.isLogged = true;
                    res.locals.userLogged = req.session.userLogged; //Paso a locals los datos de la sesión para poder usarlos a nivel global
                }
                // 3.7 - Continúa con la ejecución de app.js
                next();
            })
    }
    else {
        // 4 - Si no existe un mail guardado en cookie chequa si existe usuario en sessión y ademas si existe
        if (req.session && req.session.userLogged) {
            // 4.1 - Si existe, modifica el valor de "isLogged" a true y asigna a la variable local el usuario logueado
            res.locals.isLogged = true;
            res.locals.userLogged = req.session.userLogged; //Paso a locals los datos de la sesión para poder usarlos a nivel global
        }
        // 5 - Continúa con la ejecución de app.js
        next();
    }
}
module.exports = userLoggedMiddleware;