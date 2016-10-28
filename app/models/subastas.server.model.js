/*
Modelo Subasta 
*/
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SubastaSchema = new Schema({
    producto: {
        type: String,
        default: '',
        required: 'Por favor complete el nombre del producto',
        trim: true
    },
    initCost: {
        type: Number,
        default: '',
        required: 'Por favor complete el costo inicial del producto',
        trim: true
    },
    fecha: {
        type: Date,
        default: '',
        required: 'Por favor configure la fecha y hora de la subasta',
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Subasta', SubastaSchema);
