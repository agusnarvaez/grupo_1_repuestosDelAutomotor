const express = require('express'); // Solicitud de Express
const router = express.Router(); //Módulo Router de Express
const path = require('path'); //Módulo Path de Express

/* *****Controlador de productos***** */
let productController = require('../controllers/productController.js');

// ************ Configuración Multer (Va en route) ***************
const multer = require('multer');
/*const storage = multer.diskStorage({
	destination: function (req, file, cb) { //Define la ruta de destino
		cb(null, './public/images/productos');
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname)); //Define el nombre del arhchivo
	}
})
var upload = multer({ storage }); */
let imagesCounter = '1' /* Variable que en un futuro usaremos para subir más de una imágen*/

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, '../data/productsImages')
    },
    filename: function (req, file, cb){
        cb(null, (imagesCounter + '_' + req.body.productName +  '.jpg'))
    }
})

const productCrud = multer({ storage })

/* *****A página productos**** */
router.get('/', productController.index);


/* *****A página carrito**** */
router.get('/cart', productController.cart);


/* *****A página detalle***** */
router.get('/detail/:id', productController.detail);

/* *****Métodos para registro de producto ***** */
router.get("/creation", productController.register); /* A página registro de producto */
// router.post("/creation", upload.single("image"), productController.create); OJO, DEBERÍA SER POST Y NO PUT/* *****Creación de producto***** */
router.put("/creation", productCrud.single('image'), productController.create); /* *****Creación de producto***** */

/* *****Métodos para edición de producto ***** */
router.get("/edition/:id", productController.edition); /* A página edición de producto */
// router.put("/edition/:id", upload.single("edited-product-image"), productController.edit); Generado por AN /* *****Edición de producto***** */
router.put("/edition", productCrud.single('image'), productController.edit); /* *****Edición de producto***** */

module.exports = router; // Exportación ruteo