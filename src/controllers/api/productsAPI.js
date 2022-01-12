const { userInfo } = require("os");
const path = require("path"); //Módulo Path de Express

const db = require('../../database/models');
const productController = require("../productController");
const products = db.Product
const Op = db.Sequelize.Op
/* *****Controlador de productos***** */
const productAPIController = {
    products: function (req, res) {
        //1 - Busca todas las subcategorías
        db.Subcategory.findAll()
            .then(function (subcategories) {

                /***2 - GUARDA en subcategoriesList un array con todas las propiedades de las subcategorías***/
                let subcategoriesList = subcategories.map((subcategory) => {
                    return subcategory.dataValues
                })


                //3 - Busca todos los productos
                db.Product.findAll()
                    .then(function (products) {
                        /*** 4 - GUARDA en productsList un array con todas las propiedades de las lista de productos***/
                        let productsList = products.map((product) => {
                            return product.dataValues
                        })

                        /*** 5 - GUARDA en productsListOriginal un array con todas las propiedades de las lista de productos***/
                        let productsListOriginal = products.map((product) => {
                            return product.dataValues
                        })


                        /** 6 - RECORRO la lista de productos donde les borro el precio y la imagen de productos */
                        productsList.forEach((product) => {
                            delete product.price;
                            delete product.product_image;
                            /** 6.2 - RECORRO la lista productsOriginal fitrando aquellos que coincidan sus categorías a la lista de productos similares*/
                            let similarProducts = productsListOriginal.filter(selectedProduct => selectedProduct.subcategory_id == product.subcategory_id);

                            /** 6.3 - AGREGA el DETALLE del producto, la API y la lista de productos SIMILARES a la LISTA DE PRODUCTOS */
                            product.detail = `http://localhost:5000/products/detail/${product.id}`;
                            product.api = `http://localhost:5000/api/products/${product.id}`;
                            product.similar_products = similarProducts.map((similarProduct) => { return similarProduct.product_name })
                        })
                        /** 6.4 - Termino de recorrer el la lista de productos lista para el json final y para usarla en la cuenta de productos por subcategoría */



                        // 7 - Recorre la lista de subcategorías del paso 2 para generar el listado de subcategorías
                        let subcategoriesCount = subcategoriesList.map((subcategory) => {

                            // 7.1 - Guarda el nombre de la categoría actual
                            let currentSubcategory = subcategory.subcategory_name

                            // 7.2 - Guardo la cantidad de productos de igual categoría
                            let subcategoryCount = (productsList.filter(product => product.subcategory_id == subcategory.id)).length
                            // 7.3 - Armo el objeto del producto actual con los datos necesarios
                            let actualCount = {
                                id: subcategory.id,
                                subcategory_name: currentSubcategory,
                                products_quantity: subcategoryCount,
                                category_id: subcategory.category_id
                            }

                            // 7.4 - Envío el objeto al índice actual del array
                            return (/* String(currentSubcategory) + ": " + String(subcategoryCount) */actualCount)
                        })
                        // 7.5 - Quedó armado el array de productos por subcategoría listo para le json final y para la cuenta de productos por categoría

                        // 8 - Busco todas las categorías

                        db.Category.findAll()
                            .then(function (responses) {
                                var productsByCategory = []
                                // 8.1 - Recorremos el array de categorías guardando solamente los datos necesarios
                                let categories = responses.map(response => {
                                    return response.dataValues
                                })

                                // 8.2 - Recorro el array de las categorías
                                categories.forEach((category) => {
                                    let quantity = 0; // 8.2.1 - Inicializo la variable de cantidad
                                    /* console.log(category) */
                                    let i = 0;

                                    subcategoriesCount.forEach(object => {// 8.2.2 - Recorro el array de subcategorías
                                        /* console.log(subcategory) */
                                        if (category.id === object.category_id) { // 8.2.2.1 - Si la categoría coincide, suma los productos de esa subcategoría
                                            quantity = quantity + object.products_quantity
                                        }
                                    })
                                    // 8.2.3 - Agrego la cantidad de productos a la categoría actual
                                    category.quantity = quantity;
                                    productsByCategory.push(category)
                                })


                                // 9 - Armo la respuesta final de /api/products/
                                let response = {
                                    count: productsList.length, // (Paso 6) Cantidad de productos
                                    countByCategory: productsByCategory/* productsByCategory */, //Objeto con propiedad por categoría
                                    products: productsList, // (Paso 6) Array con  el listado de productos con ID, NOMBRE, DESCRIPCIÓN, ARRAY de relación de uno a muchos, URL DETALLE PRODUCTO,URL API
                                    subcategoriesCount: subcategoriesCount, // (Paso 7) Cantidad de productos por subcategoría
                                }
                                return res.json(response)
                            })


                    })
            })

    },

    detail: function (req, res) {

        db.Product.findAll()
            .then(function (products) {

                /*** 1 - GUARDA en productsList un array con todas las propiedades de las lista de productos***/
                let productsList = products.map((product) => {
                    return product.dataValues
                })

                /*** 2 - GUARDA en productsListOriginal un array con todas las propiedades de las lista de productos***/
                let productsListOriginal = products.map((product) => {
                    return product.dataValues
                })
                // 3 - Inicializo producto a enviar
                let productToSend = {}
                /** 4 - RECORRO la lista de productos donde les borro el precio y la imagen de productos */
                productsList.forEach((product) => {
                    /** 4.2 - RECORRO la lista productsOriginal fitrando aquellos que coincidan sus categorías a la lista de productos similares*/
                    let similarProducts = productsListOriginal.filter(selectedProduct => selectedProduct.subcategory_id == product.subcategory_id);

                    /** 4.3 - AGREGA la url de imagen y la lista de productos SIMILARES a la LISTA DE PRODUCTOS */
                    product.imageURL = `http://localhost:5000/images/productsImages/${product.product_image}`
                    product.similar_products = similarProducts.map((similarProduct) => { return similarProduct.product_name })
                    // 4.4 - Chequea producto elegido y lo asigna
                    if (req.params.id == product.id) {
                        productToSend = product
                    }
                })
                // 5 - Envía producto elegido
                return res.json(productToSend)
            }).catch(e => { console.log(e) })


        /*         db.Product.findByPk(req.params.id)
                            .then((product) => {
                                let productToSend = {
                                    id: product.id,
                                    name: product.product_name,
                                    description: product.description,
                                    subcategory_id: product.subcategory_id,
                                    price: product.price,
                                    similar_products: db.Product.findAll({
                                        where: {
                                            subcategory_id: product.subcategory_id
                                        }
                                    }),
                                    imageURL: `http://localhost:5000/images/productsImages/${product.product_image}`
                                }
                                return res.json(productToSend)
                            }); */
    }
};

module.exports = productAPIController; // Exportación de controlador de productos