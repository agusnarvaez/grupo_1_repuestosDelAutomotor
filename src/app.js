const express = require('express');
const app = express();
const path = require('path');
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath)); //Armamos el enlace público
app.listen(3000, () => { //Corremos el servidor 3000
    console.log('Servidor corriendo');
    console.log('http://localhost:3000/');
});


app.set('views', __dirname + '/views'); // sin este redireccionamiento de la carpeta views, no funciona

app.set('view engine', 'ejs'); //establezco a ejs como motor de plantilla

app.use(express.urlencoded({ extended: false })); //Se indica a la aplicación que todo lo que recibamos proveniente de un formulario lo capture en forma de objeto literal
app.use(express.json()); //Nos permite convertir el objeto literal de la línea anterior a un formto JSON, si es que así lo queremos




const rutasMain = require('./routes/main.js')
app.use('/', rutasMain)

/* 
Ruteo Viejo:
app.get('/', (req, res) => { //Enviamos página inicial
    //let htmlPath = path.resolve(__dirname, './views/index.html');
    res.sendFile(path.resolve(__dirname, './views/index.html'));
}); */

const rutasRegister = require('./routes/register.js')
app.use('/register', rutasRegister)

/* 
Ruteo Viejo:
app.get('/register', (req, res) => { //Enviamos página de registro
    res.sendFile(path.resolve(__dirname, './views/register.html'));
}); */



const rutasLogin = require('./routes/login.js')
app.use('/login', rutasLogin)


/* 
Ruteo Viejo:
app.get('/login', (req, res) => { //Enviamos página de login
    res.sendFile(path.resolve(__dirname, './views/login.html'));
});
 */

const rutasProductCart = require('./routes/productCart.js')
app.use('/productCart', rutasProductCart)

/* 
Ruteo Viejo:
app.get('/productCart', (req, res) => {
    //let htmlPath = path.resolve(__dirname, './views/login.html');
    res.sendFile(path.resolve(__dirname, './views/productCart.html'));
});
 */

const rutasProductDetail = require('./routes/productDetail.js')
app.use('/productDetail', rutasProductDetail)


/*
Ruteo Viejo:
app.get('/detalleProducto', (req, res) => { //Enviamos página de detalleProducto
    res.sendFile(path.resolve(__dirname, './views/detalleProducto.html'));
});
 */

const rutasProductCrud = require('./routes/productCrud.js')
app.use('/productCrud', rutasProductCrud)