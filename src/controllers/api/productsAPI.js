const { userInfo } = require("os");
const path = require("path"); //Módulo Path de Express

const db = require('../../database/models');
const productController = require("../productController");
const products = db.Product
const Op = db.Sequelize.Op
/* *****Controlador de productos***** */
const productAPIController = {
    products: function (req, res) {
        db.Subcategory.findAll().then(function(subcategories){
            let subcategoriesList = subcategories.map((subcategory) => {
                return subcategory.dataValues
            })
            db.Product.findAll().then(function(products){
                let productsList = products.map((product) =>{
                    return product.dataValues
                })

                console.log(subcategoriesList)
                console.log(productsList)
    
                productsList.forEach((product) => {
                    delete product.price;
                    delete product.product_image;
                    product.detail = `http://localhost:5000/products/detail/${product.id}`;
                    product.api = `http://localhost:5000/api/products/${product.id}`;
                    product.similar_products = db.Product.findAll({
                        where: {
                            subcategory_id: product.subcategory_id
                        }
                    })
                })

                let subcategoriesCount = subcategoriesList.map((subcategory) => {
                    let currentSubcategory = subcategory.subcategory_name
                    let subcategoryCount = (productsList.filter(product => product.subcategory_id == subcategory.id)).length
                    return ( String(currentSubcategory) + ": " + String(subcategoryCount))
                })

                let respuesta = {
                    count: productsList.length,
                    products: productsList,
                    subcategoriesCount: subcategoriesCount,
                }     
                return res.json(respuesta)
        })
        })
    },

    detail: function (req, res) {
        db.Product.findByPk(req.params.id)
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
            });
    }
};

module.exports = productAPIController; // Exportación de controlador de productos