let express = require('express'); // Solicitud de Express
let router = express.Router(); //Módulo Router de Express
const multer = require('multer');

/* *****Controlador de productos***** */
let productController = require('../controllers/productController.js');

let imagesCounter = '1' /* Variable que en un futuro usaremos para subir más de una imágen*/

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './public/images/productsImages')
    },
    filename: function (req, file, cb){
        cb(null, (imagesCounter + '_' + req.body.name +  '.jpg'))
    }
})

const productCrud = multer({ storage: storage })

/* *****A página productos**** */
router.get('/', productController.index);


/* *****A página carrito**** */
router.get('/cart', productController.cart);


/* *****A página detalle***** */
router.get('/detail/:id', productController.detail);

/* *****Métodos para registro de producto ***** */
router.get("/creation", productController.register); /* A página registro de producto */
router.put("/creation", productCrud.single('image'), productController.create); /* *****Creación de producto***** */

/* *****Métodos para registro de producto ***** */
router.get("/edition/:id", productController.edition); /* A página edición de producto */
router.put("/edition", productCrud.single('image'), productController.edit); /* *****Edición de producto***** */

module.exports = router; // Exportación ruteo