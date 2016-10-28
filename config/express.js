/*
Configuracion de express
TODO: resolver el problema de connect-flash y Angular. Armar modulo de usuarios definiendo previamente si usar http o ng-resource
*/

var config = require('./config'),
    session = require('express-session'),
    express = require('express'),
    morgan = require('morgan'), //logger
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    flash = require('connect-flash');
    //passport = require('passport');


module.exports = function() {
    var app = express();

    //Seteamos la variable NODE_ENV para que use el logger (morgan) solo en desarrollo y compress en produccion
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    /*Llamado a bodyParser y methodOverride para los verbos http*/
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    /*Configuracion del modulo session de express*/
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));

    /*Motor de plantillas*/
    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    /*connect-flash (por ahora no lo usamos)*/
    app.use(flash());
    /*app.use(passport.initialize());
    app.use(passport.session());*/

    /*Rutas de la aplicacion*/
    require('../app/routes/subastas.server.routes.js')(app);
    require('../app/routes/index.server.routes.js')(app);

    /*Ruta para el contenido estatico*/
    app.use(express.static('./public'));
    return app;
};
