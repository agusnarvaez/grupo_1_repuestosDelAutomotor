let express = require('express'); // Solicitud de Express
let router = express.Router(); //Módulo Router de Express

/* *****Controlador de main***** */
let mainController = require('../controllers/mainController.js');

/* *****A página index***** */
router.get('/', mainController.index);



module.exports = router; // Exportación ruteo