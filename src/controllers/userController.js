const path = require('path'); //Módulo Path de Express

const fs = require('fs'); //Solicito módulo de archivos

const { platform } = require('os')

const bcryptjs = require('bcryptjs');

const { validationResult } = require('express-validator'); //Solicitamos módulo para validación de campos


/* *****Objeto literal que contiene datos para head dinámico ***** */
let partialHead = JSON.parse(fs.readFileSync("src/data/partialHead.json", "utf-8"));

/* Array con los usuarios del sitio */
//const users = JSON.parse(fs.readFileSync('src/data/users.json', 'utf-8'));
const e = require('express');
const db = require("../database/models");
const users = db.User

/* *****Controlador de usuario***** */
const userController = {
    register: function (req, res) { //A página register
        /*res.cookie('testing', 'Hola mundo', { maxAge: 1000 * 30 }); Método que me permite enviar cookies al navegador => (nombre,contenido,duración)*/ 
        res.render('./users/register', { partialHead: partialHead.register });
    },
    create: function (req, res) { //Creación de producto
        let resultValidation = validationResult(req);
        //Validación del formulario
        if (resultValidation.errors.length > 0) {
            return res.render('./users/register', { partialHead: partialHead.register, errors: resultValidation.mapped(), oldData: req.body })
        } //Chequeo si el usuario existe
        else {
            users.findOne({
                where: {
                    email: req.body.email}
                })
                .then((result) => {
                    if(result != null) {
                        return res.render('./users/register', {
                            partialHead: partialHead.register,
                            errors: { email: { msg: 'Este email ya está registrado' } },
                            oldData: req.body
                        })
                    }else{
                        /**Si están todos los campos, y el usuario no existe, se crea**/
                        let file = req.file
                        let user = {
                            //id: addId(),
                            first_name: req.body.firstName,
                            last_name: req.body.lastName,
                            email: req.body.email,
                            nickname: req.body.nickname,
                            password: bcryptjs.hashSync(req.body.password, bcryptjs.genSaltSync(10)),
                            //zipCode: req.body.zipCode,
                            user_image: req.file.filename,
                            role_id: '1',
                        }
                        //users.push(user);
                        users.create(user).then(res.redirect('./login'));
                        //fs.writeFileSync('src/data/users.json', (JSON.stringify(users, null, " ")))
                    }
                }).catch((error) => {return next(error)})
        }
    },
    login: function (req, res) { //A página login
        res.render('./users/login', { partialHead: partialHead.login });
    },
    logprocess: function (req, res) {
        // return res.send(req.body);
        let loginValidation = validationResult(req); //Solicita la validación de los campos
        //let userToLogin = users.find(user => (user.email == req.body.user));

        /***Chequeamos errores de formulario***/
        if (loginValidation.errors.length > 0) {
            return res.render('./users/login', {
                partialHead: partialHead.login,
                errors: loginValidation.mapped(),
                oldData: req.body
            });
        }
    
        users.findOne({
            where: {
                email: req.body.user
            }
        }).then((result) => {
            let userToLogin = result
            /*** Si el formulario está OK, Chequeamos si el mail está en nuestra base de datos***/
            if (userToLogin) {
                /**Si el mail está en nuestra base de datos, Chequeamos si la contraseña es la correcta***/
                let password = req.body.pass;
                let passwordIsOk = bcryptjs.compareSync(password, userToLogin.password);
                if (passwordIsOk) {
                    //delete userToLogin.password; //Por seguridad borramos la password que se transmite a la session
                    //CHEQUEAR PORQUÉ, SI SE BORRA, DESPUÉS BORRA TEMPORALMENTE LA PASSWORD DEL USER

                    req.session.userLogged = userToLogin; //Se le transmiten los datos del usuario logueado a la session
                    /***Envío de cookies al navegador***/
                    /***Después las utiliza userLoggedMiddleware***/
                    if (req.body.remember_user) {
                        res.cookie('userEmail', req.body.user, { maxAge: (1000 * 60) * 2 })
                    }
                    return res.redirect('/user/profile');
                }
                /***Si los datos están mal, enviará el siguiente mensaje***/
                return res.render('./users/login', {
                    partialHead: partialHead.login,
                    errors: { user: { msg: 'Las credenciales son inválidas' } }
                });
        }
        /**Avisa si el email no está en la base de datos */
        return res.render('./users/login', {
            partialHead: partialHead.login,
            errors: {
                user: {
                    msg: 'Este email no está registrado'
                }
            }
        });
        }).catch((error) => {res.send(error)})
    },
    profile: (req, res) => {
        let userLogged = req.session.userLogged; //Se recuperan los datos del usuario logueado a la session

        return res.render('./users/profile', { partialHead: partialHead.profile, user: userLogged })
    },
    logout: (req, res) => {

        res.clearCookie('userEmail'); //Se limía la cookie
        req.session.destroy(); //Borra todo lo que está en sesión
        return res.redirect('/');
    },
    deleteUser: (req, res) => {
        users.destroy({where:{id:req.params.id}}).then(res.redirect('..'))
    }
};

module.exports = userController; // Exportación de controlador de usuario