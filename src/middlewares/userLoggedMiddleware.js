/**####IMPORTANTE####**/
/** ESTE ES UN MIDDLEWARE DE APLICACIÓN GLOBAL**/

const db = require("../database/models");
const users = db.User

function userLoggedMiddleware(req, res, next) {
    console.log('En userLoggedMiddlware')
    // 1 - Res.locals son variables que se comparten en todas las vistas sin importar el controlador.
    res.locals.isLogged = false; // La inicializo como falso
    /***Gestión de cookies ANTES de aplicar session***/
    /* console.log(req.locals) */
    // Guarda el mail que está en la cookie
    let emailInCookie = req.cookies.userEmail;
    /* console.log('Email en cookie')
    console.log(emailInCookie) */

    if (emailInCookie != undefined) { // Comprueba si hay un usuario guardado en cookie
        /* console.log('Hay email en cookie') */
        //  Si existe, lo busca en la base de datos
        db.User.findByPk(emailInCookie.id)
            .then((result) => {

                let userFromCookie = result.dataValues; //Rescata el resultado guardándonlo en la variable userFromCookie


                if (userFromCookie != null) { //Si el resultado NO es nulo, es decir, si la cookie TENÍA usuario logueado, se guarda en la sesión este valor
                    req.session.userLogged = userFromCookie;
                }


            })
            .catch((error) => { console.log(error) })
        if (req.session && req.session.userLogged) { //Si existe usuario en sesión y además existe 
            console.log('Funciona IF')
            res.locals.isLogged = true;
            /* console.log(res.locals.isLogged) */
            res.locals.userLogged = req.session.userLogged; //Paso a locals los datos de la sesión para poder usarlos a nivel global
        }
    }

    next();
}
module.exports = userLoggedMiddleware;