/*
Controller de los metodos crud del modelo Subasta ubicado en app/models/subastas.server.model.js.

Rutas definidas en app/routes/subastas.server.routes.js

Las peticiones le llegan desde un servicio de angular ubicado en public/subastas/js/subastasSrv.js
*/

'use strict';

var mongoose = require('mongoose'),
    Subasta = mongoose.model('Subasta');

exports.create = function (req, res, next){
        var subasta = new Subasta(req.body);
        subasta.save(function(err){
            if (err) {
                return next(err)
            }else {
                res.json(subasta);
            }
        });
};

exports.read = function(req, res){
    res.json(req.subasta);
};

exports.list = function(req, res, next){
    Subasta.find({}, function(err, subasta){
        if (err) {
            return next(err)
        }else {
            res.json(subasta)
        }
    });
};

exports.update = function(req, res, next){
    Subasta.findByIdAndUpdate(req.subasta.id, req.body, function(err, subasta){
        if (err) {
            return next(err)
        }else {
            res.json(subasta)
        }
    });
};

exports.delete = function(req, res, next){
    var subasta = req.subasta;
    req.subasta.remove(function(err){
        if (err) {
            return next(err)
        }else {
            res.json(subasta)
        }
    });
};

exports.subastaById = function (req, res, next, id){
    Subasta.findOne({
        _id: id/*req.subastaId*/
    }, function(err, subasta){
        if (err) {
            return next(err)
        }else {
            req.subasta = subasta;
            next();
        }
    });
};
