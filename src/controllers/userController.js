const path = require('path'); //Módulo Path de Express

const fs = require('fs'); //Solicito módulo de archivos

/* *****Objeto literal que contiene datos para head dinámico ***** */
let partialHead = JSON.parse(fs.readFileSync("src/controllers/partialHead.json", "utf-8"));

/* *****Controlador de usuario***** */
const userController = {

        register: function(req,res) { //A página register
        res.render('./users/register', { partialHead: partialHead.register });
    },
        login: function(req,res) { //A página login
        res.render('./users/login', { partialHead: partialHead.login });
    }
   
};

module.exports = userController; // Exportación de controlador de usuario