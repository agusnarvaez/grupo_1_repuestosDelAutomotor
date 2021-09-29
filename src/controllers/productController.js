const path = require("path"); //Módulo Path de Express

const fs = require('fs'); //Solicito módulo de archivos

/* *****Objeto literal que contiene datos para head dinámico ***** */
let partialHead = JSON.parse(fs.readFileSync("src/controllers/partialHead.json", "utf-8"));

/* *****Controlador de productos***** */
const productController = {
    register: function (req, res) { //Página de registro de producto
        res.render("./products/productCrud", { partialHead: partialHead.productCrud });
    },
    create: function (req, res) { //Creación de producto
        //res.send(req.body); //Por el momento solo cheuqeamos lo que se guarda con el form
        res.redirect('/');
    },
    cart: function(req,res) { //Página de carrito de productos
        res.render('./products/productCart', { partialHead: partialHead.productCart });
    },
    detail: function(req,res) { //Página de detalle de producto
        res.render('./products/productDetail', { partialHead: partialHead.productDetail });
    }
};

module.exports = productController; // Exportación de controlador de productos
