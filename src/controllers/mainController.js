let express = require('express');
const path = require('path');
//const fs = require('fs');
//let partialHeadPrueba = JSON.parse(fs.readFileSync("./partialHead.json", "utf-8"));

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

const mainController = {

    index: function (req, res) {
        console.log(partialHead);
        res.render('index', { partialHead: partialHead.index });
    }
};

module.exports = mainController;

