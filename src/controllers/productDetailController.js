const path = require('path');


const productDetailController = {

        detail: function(req,res) {
        res.render('./products/productDetail');
    },
   
};

module.exports = productDetailController;