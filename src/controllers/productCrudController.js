const path = require("path");

const productCrudController = {
  crud: function (req, res) {
    res.render("./products/productCart");
  },
};

module.exports = productCartController;
