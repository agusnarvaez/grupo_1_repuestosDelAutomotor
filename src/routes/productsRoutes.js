const express = require('express'); // Solicitud de Express
const router = express.Router(); //Módulo Router de Express
const path = require('path'); //Módulo Path de Express

/* *****Controlador de productos***** */
let productController = require('../controllers/productController.js');

// ************ Configuración Multer (Va en route) ***************
const multer = require('multer');

let imagesCounter = '1' /* Variable que en un futuro usaremos para subir más de una imágen*/

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/productsImages'); //Define la ruta de destino
    },
    filename: function (req, file, cb) {
        cb(null, (Date.now() + path.extname(file.originalname))); //Define el nombre del arhchivo
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
router.get("/creation", productController.register); /* A página creación de producto */

router.post("/creation", productCrud.single('image'), productController.create); /* *****Creación de producto***** */

/* *****Métodos para edición de producto ***** */
router.get("/edition/:id", productController.edition); /* A página edición de producto */
router.put("/edition/:id", productCrud.single('image'), productController.edit); /* *****Edición de producto***** */

/****Métodos para eliminación de producto****/
router.delete("/delete/:id", productController.delete)

module.exports = router; // Exportación ruteo