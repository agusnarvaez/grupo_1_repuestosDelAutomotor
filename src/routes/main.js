let express = require('express');

let mainController = require('../controllers/mainController.js')    

let router = express.Router();

router.get('/', mainController.index);




module.exports = router;