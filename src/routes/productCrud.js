let express = require("express");

let productCrudController = require("../controllers/productCrudController.js");

let router = express.Router();

router.get("/", productCrudController.registerProduct);

router.post("/", productCrudController.createProduct);


module.exports = router;
