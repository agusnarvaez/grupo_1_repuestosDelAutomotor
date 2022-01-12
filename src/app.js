const express = require('express'); // Requerimos Express
const app = express(); //Generamos app de express
const host = 5000; //Establezco host a utilizar
const path = require('path'); // Requerimos módulo Path
const cookies = require('cookie-parser'); //Llamo al módulo para armar cookies
/***Armamos el enlace público***/
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));


const fs = require('fs'); //Solicito módulo de archivos
//Pedimos patial Head para error 404
let partialHead = JSON.parse(fs.readFileSync("src/data/partialHead.json", "utf-8"))

/***Implementación ejs***/
app.set('views', __dirname + '/views'); // Redireccionamiento de carpeta views (sino no funciona)
app.set('view engine', 'ejs'); // Establezco EJS como motor de plantilla


/***Habilitamos los métodos PUT y DELETE***/
const methodOverride = require('method-override');
app.use(methodOverride('_method'));


/***Habilitamos las session de la página***/
/**Session es un objeto literal que vive en el request**/
const session = require('express-session'); // Requerimos módulo Session de express

app.use(session({ //Se pasa como middleware de APLICACIÓN
    secret: "El Rastrojero", //Propiedad secret
    resave: false,  //Propiedad resave
    saveUninitialized: false //Propiedad saveUninitialized
}));

const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

/**Implementación global cookies ***/
app.use(cookies());

/*** Implementación de middleware que chequea usuario logueado mediante**/
app.use(userLoggedMiddleware);



/****** Configuración para CRUD ******/
app.use(express.urlencoded({ extended: false })); //Se indica a la aplicación que todo lo que recibamos proveniente de un formulario lo capture en forma de objeto literal
app.use(express.json()); //Nos permite convertir el objeto literal de la línea anterior a un formto JSON, si es que así lo queremos


/**Para que funcione API en dashboard**/
/* const cors = require("cors");
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions)) */ // Use this after the variable declaration


/****** Solicitud Rutas ******/
const mainRoutes = require('./routes/mainRoutes.js'); /****** Ruta Main ******/
const userRoutes = require('./routes/userRoutes.js'); /****** Ruta Users ******/
const productRoutes = require('./routes/productsRoutes.js'); /****** Ruta Products ******/
const productsAPI = require('./routes/api/productsAPIRoutes.js');
const usersAPI = require('./routes/api/usersAPIRoutes.js');

/* #### USO RUTAS #### */
app.use('/', mainRoutes); //A rutas principales
app.use('/user', userRoutes) //A rutas de usuarios
app.use('/products', productRoutes); //A rutas de productos
app.use('/api/users', usersAPI); //A rutas de API de usuarios
app.use('/api/products', productsAPI); //A rutas de API de productos
app.use((req, res, next) => {
    res.status(404).render('notFound', { partialHead: partialHead.notFound })
})
/***Corremos el servidor indicado en la variable host***/
app.listen(host, () => {
    console.log('Servidor corriendo => http://localhost:' + host + '/');
});
