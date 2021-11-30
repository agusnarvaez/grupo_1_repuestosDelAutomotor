const fs = require('fs'); //Solicito módulo de archivos

/* Array con los usuarios del sitio */
//const users = JSON.parse(fs.readFileSync('src/data/users.json', 'utf-8'));
const db = require("../database/models");
const users = db.User

function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false; //Res.locals son variables que se comparten en todas las vistas sin importar el controlador.

    /***Gestión de cookies ANTES de aplicar session***/
    let emailInCookie = req.cookies.userEmail;
    db.User.findOne({
        where: {
            email: emailInCookie
        }
    }).then((result) => {
        let userFromCookie = result;
        if (result != null) {
            req.session.userLogged = userFromCookie;
        }
        if (req.session && req.session.userLogged) {
            res.locals.isLogged = true;
            res.locals.userLogged = req.session.userLogged; //Paso a locals los datos de la sesión para poder usarlos a nivel global
        }
    }).catch((error) => { })
    next();
}
module.exports = userLoggedMiddleware;