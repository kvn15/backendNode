'use strict';

var mongoose = require('mongoose'); //schema => tabla de bd


var Schema = mongoose.Schema; //estaran todos los campos

var carritoSchema = Schema({
  producto: {
    type: Schema.ObjectId,
    ref: 'producto',
    required: true
  },
  cliente: {
    type: Schema.ObjectId,
    ref: 'cliente',
    required: true
  },
  cantidad: {
    type: Number,
    require: true
  },
  variedad: {
    type: String,
    require: true
  },
  createdaT: {
    type: Date,
    "default": Date.now,
    require: true
  }
});
module.exports = mongoose.model('carrito', carritoSchema);