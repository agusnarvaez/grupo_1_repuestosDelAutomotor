const path = require('path'); //Módulo Path de Express

const fs = require('fs'); //Solicito módulo de archivos

const { platform } = require('os')

/* *****Objeto literal que contiene datos para head dinámico ***** */
let partialHead = JSON.parse(fs.readFileSync("src/controllers/partialHead.json", "utf-8"));

/* Array con los usuarios del sitio */
const users = JSON.parse(fs.readFileSync('src/data/users.json', 'utf-8'));

/* *****Controlador de usuario***** */
const userController = {
    register: function(req,res) { //A página register
        res.render('./users/register', { partialHead: partialHead.register });
    },
    create: function (req, res) { //Creación de producto
        let user = {
            id: users.length + 1,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            nickname: req.body.nickname,
            password: req.body.password,
            zipCode: req.body.zipCode,
        };
        console.log(users)
        console.log(user)
        users.push(user)
        console.log(users)
        fs.writeFileSync('src/data/users.json', (JSON.stringify(users, null, " ")))
        res.redirect('../');
    },
    login: function(req,res) { //A página login
        res.render('./users/login', { partialHead: partialHead.login });
    }
   
};

module.exports = userController; // Exportación de controlador de usuario