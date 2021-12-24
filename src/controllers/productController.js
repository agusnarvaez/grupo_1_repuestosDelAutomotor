const path = require("path"); //Módulo Path de Express

const fs = require('fs'); //Solicito módulo de archivos

const { platform } = require('os');
const { nextTick } = require("process");

const { validationResult } = require('express-validator'); //Solicitamos módulo para validación de campos


/* *****Objeto literal que contiene datos para head dinámico ***** */
let partialHead = JSON.parse(fs.readFileSync("src/data/partialHead.json", "utf-8"));

/* Array con los productos del sitio */
//const products = JSON.parse(fs.readFileSync('src/data/products.json', 'utf-8'));

const db = require('../database/models');
const products = db.Product
const Op = db.Sequelize.Op

/* *****Controlador de productos***** */
const productController = {
    index: function (req, res) { //Página de products
        db.Product.findAll().then((products) => {
            res.render("./products/products", { partialHead: partialHead.products, products: products /*products.findAll()*/ })
        }).catch((error) => { return next(error) })


    },
    register: function (req, res) { //Página de registro de producto
        res.render("./products/creation", { partialHead: partialHead.productCreation });
    },
    /*  **** Generado por AN ****  
        create: function (req, res) { //Creación de producto (POST)
            
            const newProduct = {
                id: products[products.length - 1].id + 1,*/
    create: function (req, res, next) { //Creación de producto
        let resultValidation = validationResult(req);



        if (resultValidation.errors.length > 0) {
            return res.render('./products/creation', { partialHead: partialHead.productCreation, errors: resultValidation.mapped(), oldData: req.body })

        }

        let file = req.file
        if (!file) {
            let error = new Error('Es necesaria una imágen para crear el producto')
            error.httpStatusCode = 400
            return next(error)
        }
        /*function addId() {
            let id = products[productList.length - 1].id + 1

            if (id){
                return products[productList.length - 1].id + 1
            }else{
                return 1
            }
        }  */

        function subcategory(category) {
            let n = category.slice(12)
            return parseInt(n,10)
            /*if (category == "Subcategoría 1") {
                return 1
            } else if (category == "Subcategoría 2") {
                return 2
            } else if (category == "Subcategoría 3") {
                return 3
            } else if (category == "Subcategoría 4") {
                return 4
            } else if (category == "Subcategoría 5") {
                return 5
            } else if (category == "Subcategoría 6") {
                return 6
            }*/
        }

        let newProduct = {
            /*id: addId(),*/
            product_name: req.body.name,
            description: req.body.description,
            subcategory_id: subcategory(req.body.subcategory),
            price: req.body.price,
            product_image: req.file.filename
            /* img: '1_' + req.body.name + '.jpg' */
        };
        //products.push(newProduct);
        db.Product.create(newProduct).then(res.redirect('../')).catch((error) => { return next(error) })
        //fs.writeFileSync('src/data/products.json', (JSON.stringify(products, null, " "))); //Se agrega null y " " para que mantenga la estructura de objeto
        //products.findOne({where: {product_image: newProduct.product_image}}).then((result) => {res.redirect('detail/' + result.id)}).catch((error) => {res.send(error)});
    },
    cart: function (req, res) { //Página de carrito de productos
        res.render('./products/cart', { partialHead: partialHead.productCart });
    },
    detail: function (req, res) { //Página de detalle de producto
        let product = db.Product.findByPk(req.params.id).then((result) => {
            res.render('./products/detail', { partialHead: partialHead.productDetail, product: result })
        }).catch((error) => { return next(error) })
            //let product = products.find(product => product.id == req.params.id);
            ;
    },
    edition: function (req, res) { //Página de edición de producto (PUT)
        //let product = products.find(product => product.id == req.params.id);
        let product = db.Product.findByPk(req.params.id).then((result) => {
            res.render("./products/edition", { partialHead: partialHead.productEdition, product: result })
        }).catch((error) => { return next(error) })
    },
    edit: function (req, res) { //Edición de producto

        let resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            db.Product.findByPk(req.params.id).then((result) => {
                return res.render('./products/edition', { partialHead: partialHead.productEdition, errors: resultValidation.mapped(), product: result})
            }).catch((error) => { return next(error) })
            
        }

        

        const id = req.body.productId;
        //console.log(id);
        //console.log('Haciendo Prueba: ' + db.Product + '!!')
        products.findByPk(req.params.id)
            .then((result) => {
                let productToEdit = result
                let fileUpdate = function (imgNew) {
                    console.log()

                    if (imgNew) {
                        fs.unlinkSync(('public/images/productsImages/') + productToEdit.product_image);
                        console.log('Nueva imagen: ' + imgNew + 'Vieja Imagen: ' + productToEdit.product_image)
                        return imgNew.filename;
                    }
                    else {
                        return productToEdit.product_image;
                    }
                }
                productToEdit = {
                    product_name: req.body.name,
                    description: req.body.description,
                    subcategory_id: req.body.category,
                    price: req.body.price,
                    product_image: fileUpdate(req.file),
                };
                db.Product.update(productToEdit, { where: { id: req.params.id } })
                    .then(res.redirect('/products/detail/' + result.id))
                    .catch((error) => { return next(error) })
            })
        /*products[product.id - 1].productName = req.body.name,
        products[product.id - 1].description = req.body.description,
        products[product.id - 1].category = req.body.category,
        products[product.id - 1].price = req.body.price,
        products[product.id - 1].img = '../../images/productos/1_' + req.body.name + '.jpg',*/

        //let newProducts = products;
        //newProducts[id - 1] = productToEdit;
        //fs.writeFileSync('src/data/products.json', (JSON.stringify(newProducts, null, " ")));
    },
    delete: function (req, res) {
        /*let newProducts = products;
        let productToEdit = products.find(product => product.id == req.params.id);

        newProducts.splice((req.params.id - 1), 1);
        (('public/images/productsImages/') + productToEdit.img);
        fs.writeFileSync('src/data/products.json', (JSON.stringify(newProducts, null, " ")));*/
        products.destroy({ where: { id: req.params.id } })
        res.redirect('..');
    },
    search: function (req, res) {
        let search = req.query.search
        db.Product.findAll({
            where: {
                product_name: { [Op.like]: ('%' + search + '%') }
            }
        }).then((result) => {
            res.render("./products/products", { partialHead: partialHead.products, products: result })
        }).catch((error) => {
            res.send("No se han encontrado resultados para su búsqueda")
        })
    },
};

module.exports = productController; // Exportación de controlador de productos
