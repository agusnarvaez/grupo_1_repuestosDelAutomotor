const path = require('path'); //Módulo Path de Express

const fs = require('fs'); //Solicito módulo de archivos

const { platform } = require('os')

const bcrypt = require('bcryptjs');

const { validationResult } = require('express-validator')


/* *****Objeto literal que contiene datos para head dinámico ***** */
let partialHead = JSON.parse(fs.readFileSync("src/data/partialHead.json", "utf-8"));

/* Array con los usuarios del sitio */
const users = JSON.parse(fs.readFileSync('src/data/users.json', 'utf-8'));

/* *****Controlador de usuario***** */
const userController = {
    register: function(req,res) { //A página register
        res.render('./users/register', { partialHead: partialHead.register });
    },
    create: function (req, res) { //Creación de producto
        
        const resultValidation = validationResult(req);
        
        

        if (resultValidation.errors.length > 0){
            return res.render('./users/register', { partialHead: partialHead.register, errors: resultValidation.mapped(), oldData: req.body})

        }

        let file = req.file
        let user = {
            id: users[users.length - 1].id + 1,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            nickname: req.body.nickname,
            password: bcrypt.hashSync(req.body.password, 10),
            zipCode: req.body.zipCode,
            img: req.file.filename,
        };
        users.push(user)
        
        fs.writeFileSync('src/data/users.json', (JSON.stringify(users,null," ")))
        res.redirect('../');
    },
    login: function(req,res) { //A página login
        res.render('./users/login', { partialHead: partialHead.login });
    }
   
};

module.exports = userController; // Exportación de controlador de usuario