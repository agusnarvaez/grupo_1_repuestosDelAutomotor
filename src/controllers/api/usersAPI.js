const path = require('path'); //Módulo Path de Express




/* *****Objeto literal que contiene datos para head dinámico ***** */


/* Array con los usuarios del sitio */
//const users = JSON.parse(fs.readFileSync('src/data/users.json', 'utf-8'));
const e = require('express');
const db = require("../../database/models");
const users = db.User;

/* let infoUsers = {
    count: 0,
    user: [{}]
} */

/* *****Controlador de API de usuario***** */
const usersAPIController = {

    users: function (req, res) {
        
        db.User.findAll()
            .then(users => {

                let usersToSend = users.map((user) => {

                    return user.dataValues

                })

                usersToSend.forEach((user) => {
                    // Elinamos la información sensible que no queremos enviar
                    delete user.password;
                    delete user.user_image;
                    delete user.nickname
                    delete user.role_id
                    user.detail = `http://localhost:5000/api/users/${user.id}`

                })

                let respuesta = {
                    count: users.length,
                    users: usersToSend

                }
                res.json(respuesta);
            })

    },
    detail: function (req, res) {

        db.User.findByPk(req.params.id)
        .then((user)=>{

            let userToSend = {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                imageURL: `http://localhost:5000/images/usersImages/${user.user_image}`
            }

            res.json(userToSend)

        } )
        
        /* console.log('Ruta api/users/:id')
        return res.send('Ruta api/users/id') */
    },
    pagination: function (req, res) {
        
        // asignamos el paginado que viene por URL en una variable y lo convertimos en número, dado que viene como string
        let offset= parseInt(req.params.offset)  
            
        db.User.findAll({limit:10, offset:offset }) //se envían como parámetros tanto el limit que queramos, como el offset que llega por la URL
            .then(users => {

                let usersToSend = users.map((user) => {

                    return user.dataValues

                })

                usersToSend.forEach((user) => {
                    // Elinamos la información sensible que no queremos enviar
                    delete user.password;
                    delete user.user_image;
                    delete user.nickname
                    delete user.role_id
                    user.detail = `http://localhost:5000/api/users/${user.id}`

                })

                let respuesta = {
                    
                    users: usersToSend

                }
                res.json(respuesta);
            })

    }
};
// Exportación de controlador de API de usuario
module.exports = usersAPIController;