/*
Configuracion de passport (por ahora no lo usamos)
*/

var passport = require('passport'),
    mongoose = require('mongoose');

module.exports = function(){
    var User = mongoose.model('User');

    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        //metodo de mongoose en el que usamos el parametro options para decirle que no queremos que
        //nos devuelva las propiedades -password y -salt
        User.findOne({
            _id: id
        }, function(err, user){
            done(err, user);
        });
    });

    require ('./strategies/local.js')();
};
