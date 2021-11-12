const multer = require('multer'); //Solicitamos Multer
const path = require('path'); //Solicitamos path
const storage = multer.diskStorage({ //Indicamos datos de almacenamiento con el método diskStorage
    destination: (req, file, cb) => {
        cb(null, './public/images/productsImages'); //Define la ruta de destino
    },
    filename: (req, file, cb) => {
        cb(null, (Date.now() + path.extname(file.originalname))); //Define el nombre del arhchivo
    }
})
const productCrud = multer({ storage: storage }); //Aplicamos método de multer

module.exports = productCrud;