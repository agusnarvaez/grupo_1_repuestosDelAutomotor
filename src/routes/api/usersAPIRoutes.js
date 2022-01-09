let express = require('express'); // Solicitud de Express
let router = express.Router(); //Módulo Router de Express
const path = require('path'); //Módulo Path de Express

/* *****Controlador de API de usuario***** */
let userAPIController = require('../../controllers/api/usersAPI');

/* **** A API de users***** */
router.get('/', userAPIController.users);

/* *****A API de paginado de user***** */
router.get('/pagination/:offset', userAPIController.pagination);

/* *****A API de detalle de user***** */
router.get('/:id', userAPIController.detail);




module.exports = router; // Exportación ruteo