/*
Controlador de la view principal (usamos el motor de plantillas 'ejs')
*/


'use strict';

exports.render = function(req, res){

    res.render('index', {
        title: 'Subastas Online',
    });
};
