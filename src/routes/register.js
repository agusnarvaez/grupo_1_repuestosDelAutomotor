let express = require('express');

let mainController = require('../controllers/registerController.js')    

let router = express.Router();

router.get('/', mainController.register);




module.exports = router;