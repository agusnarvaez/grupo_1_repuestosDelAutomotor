const path = require('path');

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


const loginController = {

        login: function(req,res) {
        res.render('./users/login', { partialHead: partialHead.login });
    },
   
};

module.exports = loginController;

console.log(path.resolve('./src/views/login.html'))