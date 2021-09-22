const path = require('path');


const loginController = {

        login: function(req,res) {
        res.render('./users/login');
    },
   
};

module.exports = loginController;

console.log(path.resolve('./src/views/login.html'))