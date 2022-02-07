'use strict'

var mongoose = require('mongoose');
//schema => tabla de bd
var Schema = mongoose.Schema;

//estaran todos los campos
var productoSchema = Schema({
    titulo: {type: String, required: true},
    slug: {type: String, required: true},
    galeria: [{type: Object, required: false}],
    portada: {type: String, required: true},
    precio: {type: Number, required: true},
    descripcion: {type: String, required: true},
    contenido: {type: String, required: true},
    stock: {type: Number, required: true},
    nventas: {type: Number, default: 0, required: true},
    npuntos: {type: Number, default: 0, required: true},
    variedades: [{type: Object, required: false}],
    titulo_variedad: {type: String, required: false},
    categoria: {type: String, required: true},
    estado: {type: String, default: 'Edicion',required: true},
    createdaT: {type: Date, default: Date.now, require: true}
});

module.exports = mongoose.model('producto', productoSchema);