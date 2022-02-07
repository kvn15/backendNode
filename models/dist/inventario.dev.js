'use strict';

var mongoose = require('mongoose'); //schema => tabla de bd


var Schema = mongoose.Schema; //estaran todos los campos

var inventarioSchema = Schema({
  producto: {
    type: Schema.ObjectId,
    ref: 'producto',
    required: true
  },
  cantidad: {
    type: Number,
    require: true
  },
  admin: {
    type: Schema.ObjectId,
    ref: 'admin',
    required: true
  },
  proveedor: {
    type: String,
    require: true
  },
  createdaT: {
    type: Date,
    "default": Date.now,
    require: true
  }
});
module.exports = mongoose.model('inventario', inventarioSchema);