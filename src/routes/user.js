let express = require('express'); // Solicitud de Express
let router = express.Router(); //Módulo Router de Express
const path = require('path'); //Módulo Path de Express


/* *****Controlador de usuario***** */
let userController = require('../controllers/userController.js');


/* *** Configuración multer ***/
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/usersImages')
    },
    filename: function (req, file, cb) {
        /*cb(null, (imagesCounter + '_' + req.body.name +  '.jpg'))*/
        /*cb(null, (this.req.file.filename))*/
        cb(null, (Date.now() + path.extname(file.originalname)));
    }
})

const userCrud = multer({ storage: storage });

/* *Middlewares de validación* */
//const registerValidation = require('../middlewares/registerValidationMiddleware');
const { body } = require('express-validator');
const registerValidation = [ //Array de validaciones de registro
    body('firstName').notEmpty().withMessage('Debes ingresar un nombre'),
    body('lastName').notEmpty().withMessage('Debes ingresar un apellido'),
    body('zipCode').notEmpty().withMessage('Debes ingresar un código postal'),
    body('email')
        .notEmpty().withMessage('Debes ingresar un correo electrónico').bail()
        .isEmail().withMessage('Debes ingresar un formato de correo electrónico válido'),
    body('nickname').notEmpty().withMessage('Debes ingresar un usuario'),
    body('password').notEmpty().withMessage('Debes ingresar una contraseña')
        .bail(),
    body('repeatPassword').notEmpty().withMessage('Debes repetir la contraseña'),
    body('image').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.jpeg'];

        if (!file) {
            throw new Error('Tienes que subir una imagen');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error('Las extensiones de archivo permitidas son .jpg, .png, .jpeg');

            }
        }
        return true
    })
];
/**Solicitud de middleware de validación de login**/
const loginValidation = require('../middlewares/logInValidationMiddleware');

const guestMiddleware = require('../middlewares/guestMiddleware');

/* *****A página register***** */
router.get('/register', guestMiddleware, userController.register);
router.post('/register', userCrud.single('image'), registerValidation, userController.create); //Revisar que si un usuario no se genera, pero si se cargó la foto, la misma se almacena

/* *****A página login***** */
router.get('/login', guestMiddleware, userController.login);
router.post('/login', loginValidation, userController.logprocess)



module.exports = router; // Exportación ruteo