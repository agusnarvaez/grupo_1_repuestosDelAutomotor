const express = require('express'); // Solicitud de Express
const router = express.Router(); //Módulo Router de Express
const path = require('path'); //Módulo Path de Express

/* *****Controlador de productos***** */
let productsAPIController = require('../../controllers/api/productsAPI.js');


/* *****A API de productos**** */
router.get('/', productsAPIController.products);

/* *****A API de detalle de producto**** */
router.get('/:id', productsAPIController.detail);

module.exports = router; // Exportación ruteo