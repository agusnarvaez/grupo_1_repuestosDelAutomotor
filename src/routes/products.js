let express = require('express'); // Solicitud de Express
let router = express.Router(); //Módulo Router de Express

/* *****Controlador de productos***** */
let productController = require('../controllers/productController.js');


/* *****A página carrito**** */
router.get('/cart', productController.cart);


/* *****A página detalle***** */
router.get('/detail', productController.detail);

/* *****Métodos para registro de producto ***** */
router.get("/crud", productController.register); /* A página registro de producto */
router.post("/crud", productController.create); /* *****Creación de producto***** */


module.exports = router; // Exportación ruteo