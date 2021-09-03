const express = require('express');
const app = express();
const path = require('path');
const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath)); //Armamos el enlace público
app.listen(3000, () => { //Corremos el servidor 3000
    console.log('Servidor corriendo');
    console.log('http://localhost:3000/');
});

app.get('/', (req, res) => { //Enviamos página inicial
    //let htmlPath = path.resolve(__dirname, './views/index.html');
    res.sendFile(path.resolve(__dirname, './views/index.html'));
});

app.get('/register', (req, res) => { //Enviamos página de registro
    res.sendFile(path.resolve(__dirname, './views/register.html'));
});

app.get('/login', (req, res) => { //Enviamos página de login
    res.sendFile(path.resolve(__dirname, './views/login.html'));
});


