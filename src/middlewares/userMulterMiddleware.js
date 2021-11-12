const multer = require('multer'); //Solicitamos Multer
const path = require('path'); //Solicitamos path
const storage = multer.diskStorage({ //Indicamos datos de almacenamiento con el método diskStorage
    destination: (req, file, cb) => { //Indicamos destino de archivo
        cb(null, './public/images/usersImages')
    },
    filename: (req, file, cb) => { //Indicamos nombre de archivo
        cb(null, (Date.now() + path.extname(file.originalname)));
    }
})

const userCrud = multer({ storage: storage }); //Aplicamos método de multer

module.exports = userCrud;