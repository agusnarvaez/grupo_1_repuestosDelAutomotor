const path = require("path");

const productCrudController = {
  registerProduct: function (req, res) {
    res.render("./products/productCrud");
  },
  createProduct: function (req, res) {
    res.send(req.body);
    
  },


};

module.exports = productCrudController;
