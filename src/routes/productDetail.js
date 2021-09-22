let express = require('express');

let productDetailController = require('../controllers/productDetailController.js')    

let router = express.Router();

router.get('/', productDetailController.detail);




module.exports = router;