let express = require("express");

let productCrudController = require("../controllers/productCrudController.js");

let router = express.Router();

router.get("/", productCrudController.create);
router.post("/", productCrudController.create);

module.exports = router;
