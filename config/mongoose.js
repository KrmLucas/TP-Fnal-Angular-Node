/*
Configuracion de mongoose
*/

var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function (){
    mongoose.Promise = global.Promise;
    var db = mongoose.connect(config.db);
    require('../app/models/subastas.server.model');
    return db;
};
