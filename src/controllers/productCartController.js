const path = require('path');


const productCartController = {

        cart: function(req,res) {
        res.render('productCart');
    },
   
};

module.exports = productCartController;