/*
Configuracion de la estrategia local de passport
TODO: arreglarlo para http o usar ng-resource en Angular y por lo tanto cambiar el servicio y el controlador  
*/

var passport = require('passport'),
    Localstrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User');

module.exports = function(){
    passport.use(new Localstrategy(function(username, password, done){
        User.findOne({username: username})
        .then (function(err, user){
            if (err) {
                return done(err);
            }
            if (!user) {
                return dane (null, false, {
                    message: 'Unknow user'
                });
            }
            if (!user.authenticate(password)) {
                return done(null, false, {
                    message: 'Password error'
                });
            }
            return done(null, user);
        });
    }));
};
