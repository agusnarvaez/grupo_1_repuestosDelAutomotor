const path = require('path'); //Módulo Path de Express




/* *****Objeto literal que contiene datos para head dinámico ***** */


/* Array con los usuarios del sitio */
//const users = JSON.parse(fs.readFileSync('src/data/users.json', 'utf-8'));
const e = require('express');
const db = require("../../database/models");
const users = db.User

/* let infoUsers = {
    count: 0,
    user: [{}]
} */

/* *****Controlador de API de usuario***** */
const usersAPIController = {

    users: function (req, res) {
        console.log('Ruta api/users')
        return res.send('Ruta api/users')
    },
    detail: function (req, res) {
        console.log('Ruta api/users/:id')
        return res.send('Ruta api/users/id')
    }
};
// Exportación de controlador de API de usuario
module.exports = usersAPIController;