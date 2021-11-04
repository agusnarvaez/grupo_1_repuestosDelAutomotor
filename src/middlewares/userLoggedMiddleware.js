const fs = require('fs'); //Solicito módulo de archivos
/* Array con los usuarios del sitio */
const users = JSON.parse(fs.readFileSync('src/data/users.json', 'utf-8'));
function userLoggedMiddleware(req, res, next) {
    // console.log('Pasé por userLogged');
    res.locals.isLogged = false; //Res.locals son variables que se comparten en todas las vistas sin importar el controlador.

    /***Gestión de cookies ANTES de aplicar session***/
    let emailInCookie = req.cookies.userEmail;
    let userFromCookie = users.find(user => (user.email == emailInCookie));
    console.log(userFromCookie);
    if (userFromCookie) {
        req.session.userLogged = userFromCookie;
    }

    if (req.session && req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged; //Paso a locals los datos de la sesión para poder usarlos a nivel global
    }


    next();
}
module.exports = userLoggedMiddleware;