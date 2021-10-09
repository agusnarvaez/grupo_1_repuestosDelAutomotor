const path = require("path"); //Módulo Path de Express

const fs = require('fs'); //Solicito módulo de archivos

const { platform } = require('os')

/* *****Objeto literal que contiene datos para head dinámico ***** */
let partialHead = JSON.parse(fs.readFileSync("src/controllers/partialHead.json", "utf-8"));

/* Array con los productos del sitio */
const products = JSON.parse(fs.readFileSync('src/data/products.json', 'utf-8'));

/* *****Controlador de productos***** */
const productController = {
    register: function (req, res) { //Página de registro de producto
        res.render("./products/creation", { partialHead: partialHead.productCreation });
    },
    create: function (req, res) { //Creación de producto
        let newProduct = {
            id: products.length + 1,
            productName: req.body.productName,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            img: req.body.img,
        };
        products.push(newProduct)
        fs.writeFileSync('src/data/products.json', (JSON.stringify(products)))
        res.redirect('../');
    },
    cart: function(req,res) { //Página de carrito de productos
        res.render('./products/cart', { partialHead: partialHead.productCart });
    },
    detail: function(req,res) { //Página de detalle de producto
        res.render('./products/detail', { partialHead: partialHead.productDetail });
    },
    edition: function (req, res) { //Página de edición de producto
        let product = products.find(product => product.id == req.params.id);
        res.render("./products/edition", { partialHead: partialHead.productEdition , product: product});
    },
    edit: function (req, res) { //Edición de producto
        let product = products.find(product => product.id == req.body.productId);
        products[product.id - 1].productName = req.body.name,
        products[product.id - 1].description = req.body.description,
        products[product.id - 1].category = req.body.category,
        products[product.id - 1].price = req.body.price,
        products[product.id - 1].img = req.body.img,
        fs.writeFileSync('src/data/products.json', (JSON.stringify(products)))
        res.redirect('../../');
    }
};

module.exports = productController; // Exportación de controlador de productos
