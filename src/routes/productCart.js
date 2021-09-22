let express = require('express');

let productCartController = require('../controllers/productCartController.js')    

let router = express.Router();

router.get('/', productCartController.cart);




module.exports = router;