const express = require('express'); // Solicitud de Express
const router = express.Router(); //Módulo Router de Express
const path = require('path'); //Módulo Path de Express

/* *****Controlador de productos***** */
let productController = require('../controllers/productController.js');

let imagesCounter = '1' /* Variable que en un futuro usaremos para subir más de una imágen*/

/* *** Configuración middleware multer ***/
let productCrud = require('../middlewares/productMulterMiddleware.js');

/* *** Configuración middleware multer ***/
let productCreateValidation = require('../middlewares/productCreateValidationMiddleware.js');

let productEditValidation = require('../middlewares/productEditValidationMiddleware.js');

/* *****A página productos**** */
router.get('/', productController.index);

/* *****A página carrito**** */
router.get('/cart', productController.cart);

/* *****A página detalle***** */
router.get('/detail/:id', productController.detail);

/* *****Métodos para registro de producto ***** */
router.get("/creation", productController.register); /* A página creación de producto */

router.post("/creation", productCrud.single('image'), productCreateValidation, productController.create); /* *****Creación de producto***** */

/* *****Métodos para edición de producto ***** */
router.get("/edition/:id", productController.edition); /* A página edición de producto */
router.put("/edition/:id", productCrud.single('image'), productEditValidation, productController.edit); /* *****Edición de producto***** */

/****Métodos para eliminación de producto****/
router.delete("/delete/:id", productController.delete)

/****Métodos para búsqueda de producto****/
router.get("/search", productController.search)

module.exports = router; // Exportación ruteo