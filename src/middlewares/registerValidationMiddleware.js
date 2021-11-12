const { body } = require('express-validator');
const path = require('path');

const validations = [ //Array de validaciones de login
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

module.exports = validations;