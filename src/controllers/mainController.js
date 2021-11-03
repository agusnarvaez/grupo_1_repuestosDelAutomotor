let express = require('express'); // Solicitud de Express
const path = require('path'); //Módulo Path de Express
const fs = require('fs'); //Solicito módulo de archivos

/* *****Objeto literal que contiene datos para head dinámico ***** */
let partialHead = JSON.parse(fs.readFileSync("src/data/partialHead.json", "utf-8"));

/* *****Controlador principal***** */
const mainController = {
    index: function (req, res) { //A página index
        res.render('index', { partialHead: partialHead.index});
    }
};

module.exports = mainController; // Exportación de controlador principal

