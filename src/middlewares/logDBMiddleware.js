const fs = require('fs');

function logDBMiddleware (req, res, next) {
    fs.appendFileSync('logDB.txt', 'se ingresó en la página' + req.url)
    next();

}


module.exports = logDBMiddleware;

