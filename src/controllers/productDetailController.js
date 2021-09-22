const path = require('path');


const productDetailController = {

        detail: function(req,res) {
        res.render('./product/productDetail');
    },
   
};

module.exports = productDetailController;