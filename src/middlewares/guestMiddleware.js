function guestMiddleware(req, res, next) {
    /* console.log('En guest middleware')
    console.log(req.session.userLogged) */
    if (req.session.userLogged) {
        return res.redirect('/user/profile');
    } else {
        next();
    }
}

module.exports = guestMiddleware;