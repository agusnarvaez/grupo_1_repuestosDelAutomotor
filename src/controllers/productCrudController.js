const path = require("path");

const partialHead = {
    index: {
        title: 'El rastrojero',
        style: 'styles.css'
    },
    login: {
        title: 'Login',
        style: '../css/login.css'
    },
    register: {
        title: 'Register',
        style: '../css/register.css'
    },
    productDetail: {
        title: 'Product Detail',
        style: '../css/productDetail.css'
    },
    productCart: {
        title: 'Product Cart',
        style: '../css/productCart.css'
    },
    productCrud: {
        title: 'Product Crud',
        style: '../css/productCrud.css'
    }
}


const productCrudController = {
  registerProduct: function (req, res) {
    res.render("./products/productCrud", { partialHead: partialHead.productCrud });
  },
  createProduct: function (req, res) {
    res.send(req.body);
    
  },


};

module.exports = productCrudController;
