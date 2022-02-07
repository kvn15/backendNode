'use strict'

var mongoose = require('mongoose');
//schema => tabla de bd
var Schema = mongoose.Schema;

//estaran todos los campos
var cuponSchema = Schema({
    codigo: {type: String, required: true},
    tipo: {type: String, required: true},//VALOR EN PORCENTAJE O PRECIO FIJO
    valor: {type: Number, required: true},
    limite: {type: Number, required: true},
    createdaT: {type: Date, default: Date.now, require: true}
});

module.exports = mongoose.model('cupon', cuponSchema);