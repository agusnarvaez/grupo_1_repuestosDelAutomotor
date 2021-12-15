const { body } = require('express-validator');
const path = require('path');

const validations = [ //Array de validaciones de login
    body('firstName')
        .notEmpty().withMessage('Debes ingresar un nombre').bail()
        .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
    body('lastName')
        .notEmpty().withMessage('Debes ingresar un apellido').bail()
        .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
    body('zipCode').notEmpty().withMessage('Debes ingresar un código postal'),
    body('email')
        .notEmpty().withMessage('Debes ingresar un correo electrónico').bail()
        .isEmail().withMessage('Debes ingresar un formato de correo electrónico válido'),
    body('nickname').notEmpty().withMessage('Debes ingresar un usuario'),
    body('password')
        .notEmpty().withMessage('Debes ingresar una contraseña').bail()
        .isLength({ min:8}).withMessage('La contraseña debe contener al menos 8 caracteres').bail()
        .isStrongPassword({
            minUppercase: 1,
            minLowercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          }).withMessage('La contraseña debe contener como mínimo: una letra mayúscula, una letra minúscula, un número y un carácter especial'),   
    body('repeatPassword')
        .notEmpty().withMessage('Debes repetir la contraseña')
        .custom((value, {req, res }) => {
            if(value !== req.body.password) {
                throw new Error('No coincide con la contraseña ingresada');
        } 
            return true
        }),
    body('image').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.jpeg', '.gif'];

        if (!file) {
            throw new Error('Tienes que subir una imagen');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error("Las extensiones de archivo permitidas son '.jpg', '.png', '.jpeg' y '.gif'");

            }
        }
        return true
    })
];

module.exports = validations;