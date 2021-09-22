const path = require('path');


const productCartController = {

        cart: function(req,res) {
        res.render('./products/productCart');
    },
   
};

module.exports = productCartController;