/*
Ruteo de las peticciones http que llegan desde el servicio angular 'public/subastas/js/subastasSrv.js'
*/

'use strict';

var subastas = require('../controllers/subastas.server.controller.js');

module.exports = function(app){
    app.route('/api/subastas')
    .get(subastas.list)
    .post(subastas.create);

    app.route('/api/subastas/:subastaId')
    .get(subastas.read)
    .put(subastas.update)
    .delete(subastas.delete);

    app.param('subastaId', subastas.subastaById);
};
