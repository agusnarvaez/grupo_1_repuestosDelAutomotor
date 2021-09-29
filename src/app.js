const express = require('express'); // Requerimos Express
const app = express(); //Generamos app de express
const host = 3000; //Establezco host a utilizar

const path = require('path'); // Re querimos módulo Path

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath)); //Armamos el enlace público


app.listen(host, () => { //Corremos el servidor indicado en la variable host
    console.log('Servidor corriendo => http://localhost:'+host+'/');
});


app.set('views', __dirname + '/views'); // Redireccionamiento de carpeta views (sino no funciona)

app.set('view engine', 'ejs'); // Establezco EJS como motor de plantilla

/****** Configuración para CRUD ******/
app.use(express.urlencoded({ extended: false })); //Se indica a la aplicación que todo lo que recibamos proveniente de un formulario lo capture en forma de objeto literal
app.use(express.json()); //Nos permite convertir el objeto literal de la línea anterior a un formto JSON, si es que así lo queremos

/****** Solicitud Rutas ******/
const mainRoutes = require('./routes/main.js'); /****** Ruta Main ******/
const userRoutes = require('./routes/user.js'); /****** Ruta Users ******/
const productRoutes = require('./routes/products.js'); /****** Ruta Products ******/

/* #### USO RUTAS #### */
app.use('/', mainRoutes); //A rutas principales

app.use('/user', userRoutes) //A rutas de usuarios

app.use('/products', productRoutes); //A rutas de productos


/* 


const rutasProductCrud = require('./routes/productCrud.js')
app.use('/productCrud', rutasProductCrud)


const rutasProductDetail = require('./routes/productDetail.js')
app.use('/productDetail', rutasProductDetail)



Ruteo Viejo:
app.get('/', (req, res) => { //Enviamos página inicial
    //let htmlPath = path.resolve(__dirname, './views/index.html');
    res.sendFile(path.resolve(__dirname, './views/index.html'));
}); */


/* 
Ruteo Viejo:
app.get('/register', (req, res) => { //Enviamos página de registro
    res.sendFile(path.resolve(__dirname, './views/register.html'));
}); */


/* 
Ruteo Viejo:
app.get('/login', (req, res) => { //Enviamos página de login
    res.sendFile(path.resolve(__dirname, './views/login.html'));
});
 */

/* 
Ruteo Viejo:
app.get('/productCart', (req, res) => {
    //let htmlPath = path.resolve(__dirname, './views/login.html');
    res.sendFile(path.resolve(__dirname, './views/productCart.html'));
});
 */



/*
Ruteo Viejo:
app.get('/detalleProducto', (req, res) => { //Enviamos página de detalleProducto
    res.sendFile(path.resolve(__dirname, './views/detalleProducto.html'));
});
 */

