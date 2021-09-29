let express = require('express'); // Solicitud de Express
let router = express.Router(); //Módulo Router de Express

/* *****Controlador de usuario***** */
let userController = require('../controllers/userController.js');

/* *****A página register***** */
router.get('/register', userController.register);

/* *****A página login***** */
router.get('/login', userController.login);



module.exports = router; // Exportación ruteo