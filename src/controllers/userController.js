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
    register: function (req, res) { //A página register
        res.render('./users/register', { partialHead: partialHead.register });
    },
    create: function (req, res) { //Creación de producto

        let resultValidation = validationResult(req);

        let addId = () => {
            let id = 0;
            if (users[0].id != undefined) {
                id = users[users.length - 1].id + 1;
            }
            else {
                id = 1;
            }
            return id;
        }
        //Validación del formulario
        if (resultValidation.errors.length > 0) {
            return res.render('./users/register', { partialHead: partialHead.register, errors: resultValidation.mapped(), oldData: req.body })
        }
        //Chequeo si el usuario existe
        else if (users.find(user => (user.email == req.body.email)) != undefined) {
            res.render('./users/register', {
                partialHead: partialHead.register,
                errors: { email: { msg: 'Este email ya está registrado' } },
                oldData: req.body
            })
            //res.send('Su usuario ya existe');
        }
        /**Si están todos los campos, y el usuario no existe, se crea**/
        else {
            let file = req.file
            let user = {
                id: addId(),//users[users.length - 1].id + 1,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                nickname: req.body.nickname,
                password: bcrypt.hashSync(req.body.password, 10),
                zipCode: req.body.zipCode,
                img: req.file.filename,
            }
            users.push(user);
            /*req.session.logstatus = "logged"
            req.session.user = user.id*/
            fs.writeFileSync('src/data/users.json', (JSON.stringify(users, null, " ")))
            res.redirect('./login');
        }
    },
    login: function (req, res) { //A página login
        console.log(req.session);
        res.render('./users/login', { partialHead: partialHead.login });
    },
    logprocess: function (req, res) {
        let loginValidation = validationResult(req);
        let userToLogin = users.find(user => (user.email == req.body.user));

        /***Chequeamos errores de formulario***/
        if (loginValidation.errors.length > 0) {
            //console.log(loginValidation.mapped());
            //console.log(req.body.user);
            console.log('Hola');
            res.render('./users/login', { partialHead: partialHead.login, errors: loginValidation.mapped(), oldData: req.body });
        }

        /*** Si el formulario está OK, Chequeamos si el mail está en nuestra base de datos***/
        else if (users.find(user => (user.email == req.body.user)) == undefined) {

            res.render('./users/login', {
                partialHead: partialHead.login,
                errors: { user: { msg: 'Este email no está registrado' } }
            });
        }
        /**Si el mail está en nuestra base de datos, Chequeamos si la contraseña es la correcta***/
        else if (bcrypt.compareSync(req.body.password, userToLogin.password)) {
            delete userToLogin.password; //Por seguridad borramos la password que se transmite a la session
            req.session.userLogged = userToLogin; //Se le transmiten los datos del usuario logueado a la session
            console.log(req.session);
            res.redirect('/');
        }
        /***Si los datos están mal, enviará el siguiente mensaje***/
        else {
            res.render('./users/login', {
                partialHead: partialHead.login,
                errors: { user: { msg: 'Las credenciales son inválidas' } }
            });
        }
        /*let logindata = {
            email: req.body.usuario,
            password: req.body.password
        };
        if (users.find(user => user.email == logindata.email) != undefined){
            let userLogged = (users.find(user => user.email == logindata.email))
            
            if (bcrypt.compareSync(logindata.password, userLogged.password)){
                req.session.logstatus = "logged"
                req.session.user = (userLogged.id)
                res.redirect('../');
            }

            console.log(req.body.remember)
        }*/
    },
    deleteUser: (req, res) => {
        let allUsers = users;
        let finalUsers = allUsers.filter(user => user.id !== req.params.id);
    }
};

module.exports = userController; // Exportación de controlador de usuario