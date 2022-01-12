function authMiddleware(req, res, next) {
    /*     console.log('Entrando a auth middleware')
        console.log(req.session.userLogged) */
    if (req.session.userLogged == undefined) {
        return res.redirect('/user/login');
    } else {
        next();
    }
}

module.exports = authMiddleware;