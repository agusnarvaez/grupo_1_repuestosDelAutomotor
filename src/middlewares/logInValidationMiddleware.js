const { body } = require('express-validator');

const validations = [ //Array de validaciones de login
    body('user').notEmpty().withMessage('Debes ingresar un usuario o email'),
    body('password').notEmpty().withMessage('Debes ingresar una contraseña')
]

module.exports = validations;