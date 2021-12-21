let express = require('express'); // Solicitud de Express
let router = express.Router(); //Módulo Router de Express
const path = require('path'); //Módulo Path de Express

/* *****Controlador de usuario***** */
let userController = require('../controllers/userController.js');

/* *** Configuración middleware multer ***/
let userCrud = require('../middlewares/userMulterMiddleware.js');

/***** Middlewares de validación de formularios *****/
const registerValidation = require('../middlewares/registerValidationMiddleware'); // Validación de register
const loginValidation = require('../middlewares/logInValidationMiddleware'); // Validación de login

/***** Middlewares de sesión de usuario o invitado *****/
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

/* *****A página register***** */
router.get('/register', guestMiddleware, userController.register);
router.post('/register', userCrud.single('image'), registerValidation, userController.create); //Revisar que si un usuario no se genera, pero si se cargó la foto, la misma se almacena

/* *****A página login***** */
router.get('/login', guestMiddleware, userController.login);
router.post('/login', loginValidation, userController.logProcess)

/* ****A página de perfil de usuario ***** */
router.get('/profile', authMiddleware, userController.profile);
router.get('/logout', userController.logout);

module.exports = router; // Exportación ruteo