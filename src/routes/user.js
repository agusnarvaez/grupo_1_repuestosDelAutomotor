let express = require('express'); // Solicitud de Express
let router = express.Router(); //Módulo Router de Express
const path = require('path'); //Módulo Path de Express

/* *****Controlador de usuario***** */
let userController = require('../controllers/userController.js');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './public/images/usersImages')
    },
    filename: function (req, file, cb){
        /*cb(null, (imagesCounter + '_' + req.body.name +  '.jpg'))*/
        /*cb(null, (this.req.file.filename))*/
        cb(null, (Date.now() + path.extname(file.originalname)));
    }
})

const userCrud = multer({ storage: storage })

/* *****A página register***** */
router.get('/register', userController.register);
router.post('/register', userCrud.single('image'), userController.create)

/* *****A página login***** */
router.get('/login', userController.login);



module.exports = router; // Exportación ruteo