'use strict';

var express = require('express');

var ConfigController = require('../controllers/ConfigController');

var api = express.Router();

var auth = require('../middlewares/authenticate');

var multiparty = require('connect-multiparty');

var path = multiparty({
  uploadDir: './uploads/configuraciones'
});
api.put('/actualizar_config_admin/:id', [auth.auth, path], ConfigController.actualizar_config_admin);
api.get('/obtener_config_admin', auth.auth, ConfigController.obtener_config_admin);
api.get('/obtener_logo/:img', ConfigController.obtener_logo);
api.get('/obtener_config_public', ConfigController.obtener_config_public);
module.exports = api;