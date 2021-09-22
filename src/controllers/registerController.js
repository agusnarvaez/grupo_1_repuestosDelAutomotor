const path = require('path');


const mainController = {

        register: function(req,res) {
        res.render('./users/register');
    },
   
};

module.exports = mainController;