const { body } = require('express-validator');
const path = require('path');

const validations = [ //Array de validaciones de creación de productos
    body('name')
        .notEmpty().withMessage('Debes ingresar un nombre de producto').bail()
        .isLength({ min: 5 }).withMessage('El nombre del producto debe tener al menos 5 caracteres'),
    body('description')
        .notEmpty().withMessage('Debes ingresar una descripción del producto').bail()
        .isLength({ min: 20 }).withMessage('La descripción del producto debe tener al menos 20 caracteres'),
    body('category').notEmpty().withMessage('Debes seleccionar una subcategoría'),
    body('price').notEmpty().withMessage('Debes ingresar el precio del producto'),
    body('image').custom((value, { req }) => {
        let acceptedExtensions = ['.jpg', '.png', '.jpeg', '.gif'];

        if(req.file){
            if (!acceptedExtensions.includes(path.extname(req.file.originalname))) {
                throw new Error("Las extensiones de archivo permitidas son '.jpg', '.png', '.jpeg' y '.gif'");
            }
            return true
        }
        return true
    })
];

module.exports = validations;