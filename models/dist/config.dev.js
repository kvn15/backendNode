'use strict';

var mongoose = require('mongoose'); //schema => tabla de bd


var Schema = mongoose.Schema; //estaran todos los campos

var configSchema = Schema({
  categorias: [{
    type: Object,
    required: true
  }],
  titulo: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: true
  },
  serie: {
    type: String,
    required: true
  },
  correlativo: {
    type: String,
    required: true
  },
  createdaT: {
    type: Date,
    "default": Date.now,
    require: true
  }
});
module.exports = mongoose.model('config', configSchema);