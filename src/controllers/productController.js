const path = require("path"); //Módulo Path de Express

const fs = require('fs'); //Solicito módulo de archivos

/* *****Objeto literal que contiene datos para head dinámico ***** */
let partialHead = JSON.parse(fs.readFileSync("src/controllers/partialHead.json", "utf-8"));

/* *****Controlador de productos***** */
const productController = {
    register: function (req, res) { //Página de registro de producto
        res.render("./products/creation", { partialHead: partialHead.productCreation });
    },
    create: function (req, res) { //Creación de producto
        //res.send(req.body); //Por el momento solo cheuqeamos lo que se guarda con el form
        res.redirect('/');
    },
    cart: function(req,res) { //Página de carrito de productos
        res.render('./products/cart', { partialHead: partialHead.productCart });
    },
    detail: function(req,res) { //Página de detalle de producto
        res.render('./products/detail', { partialHead: partialHead.productDetail });
    },
    edition: function (req, res) { //Página de edición de producto
        const id = req.params.id;
        res.render("./products/edition", { partialHead: partialHead.productEdition , id : id});
    },
    edit: function (req, res) { //Edición de producto
        res.send(req.body);
    }
};

module.exports = productController; // Exportación de controlador de productos
