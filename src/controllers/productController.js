const path = require("path"); //Módulo Path de Express

const fs = require('fs'); //Solicito módulo de archivos

const { platform } = require('os');
const { nextTick } = require("process");

/* *****Objeto literal que contiene datos para head dinámico ***** */
let partialHead = JSON.parse(fs.readFileSync("src/data/partialHead.json", "utf-8"));

/* Array con los productos del sitio */
const products = JSON.parse(fs.readFileSync('src/data/products.json', 'utf-8'));

/* *****Controlador de productos***** */
const productController = {
    index: function (req, res) { //Página de products
        res.render("./products/products", { partialHead: partialHead.products, products:products})
    },
    register: function (req, res) { //Página de registro de producto
        res.render("./products/creation", { partialHead: partialHead.productCreation});
    },
/*  **** Generado por AN ****  
    create: function (req, res) { //Creación de producto (POST)
        
        const newProduct = {
            id: products[products.length - 1].id + 1,*/
    create: function (req, res, next) { //Creación de producto
        let file = req.file
        if (!file){
            let error = new Error('Es necesaria una imágen para crear el producto')
            error.httpStatusCode = 400
            return next(error)
        }
        let newProduct = {
            id: products[products.length - 1].id + 1,
            productName: req.body.name,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            img: req.file.filename
            /* img: '1_' + req.body.name + '.jpg' */
        };
        products.push(newProduct);
        fs.writeFileSync('src/data/products.json', (JSON.stringify(products, null, " "))); //Se agrega null y " " para que mantenga la estructura de objeto
        res.redirect('detail/' + newProduct.id);
    },
    cart: function(req,res) { //Página de carrito de productos
        res.render('./products/cart', { partialHead: partialHead.productCart});
    },
    detail: function(req,res) { //Página de detalle de producto
        let product = products.find(product => product.id == req.params.id);
        res.render('./products/detail', { partialHead: partialHead.productDetail, product: product});
    },
    edition: function (req, res) { //Página de edición de producto (PUT)
        let product = products.find(product => product.id == req.params.id);
        res.render("./products/edition", { partialHead: partialHead.productEdition , product: product});
    },
    edit: function (req, res) { //Edición de producto
       
        const id = req.body.productId;
        let productToEdit = products.find(product => product.id == id);
        /*products[product.id - 1].productName = req.body.name,
        products[product.id - 1].description = req.body.description,
        products[product.id - 1].category = req.body.category,
        products[product.id - 1].price = req.body.price,
        products[product.id - 1].img = '../../images/productos/1_' + req.body.name + '.jpg',*/

        let fileUpdate = function (imgNew) {
            if (imgNew) {
                fs.unlinkSync(('public/images/productsImages/') + productToEdit.img);
                return imgNew;
            }
            else {
                return productToEdit.img;
            }
        }
        
        productToEdit = {
            id: productToEdit.id,
            productName: req.body.name,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            img: /*req.file ?*/ fileUpdate(req.file.filename) /* : productToEdit.img*/
        };
        
        let newProducts = products;
        newProducts[id - 1] = productToEdit;
        fs.writeFileSync('src/data/products.json', (JSON.stringify(newProducts, null, " ")));
        res.redirect('/products/detail/' + productToEdit.id);
    },
    delete: function(req, res) {
        
        let newProducts = products;
        let productToEdit = products.find(product => product.id == req.params.id);
        
        newProducts.splice((req.params.id - 1), 1);
        (('public/images/productsImages/') + productToEdit.img);
        fs.writeFileSync('src/data/products.json', (JSON.stringify(newProducts, null, " ")));
        res.redirect('..');
    }
};

module.exports = productController; // Exportación de controlador de productos
