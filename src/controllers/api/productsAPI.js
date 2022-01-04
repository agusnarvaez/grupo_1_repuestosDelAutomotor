const path = require("path"); //Módulo Path de Express

const db = require('../../database/models');
const products = db.Product
const Op = db.Sequelize.Op
/* *****Controlador de productos***** */
const productAPIController = {
    products: function (req, res) {
        console.log('Ruta api/products')
        return res.send('Ruta api/products')
    },
    detail: function (req, res) {
        console.log('Ruta api/products/:id')
        return res.send('Ruta api/products/:id')
    }
};

module.exports = productAPIController; // Exportación de controlador de productos
