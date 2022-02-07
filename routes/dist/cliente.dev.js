'use strict';

var express = require('express');

var ClienteController = require('../controllers/ClienteController');

var api = express.Router();

var auth = require('../middlewares/authenticate');

api.post('/registro_cliente', ClienteController.registro_cliente);
api.post('/login_cliente', ClienteController.login_cliente);
api.get('/listar_clientes_filtro_admin/:tipo/:filtro?', auth.auth, ClienteController.listar_clientes_filtro_admin);
api.post('/registro_cliente_admin', auth.auth, ClienteController.registro_cliente_admin);
api.get('/obtener_cliente_admin/:id', auth.auth, ClienteController.obtener_cliente_admin);
api.put('/actualizar_cliente_admin/:id', auth.auth, ClienteController.actualizar_cliente_admin);
api["delete"]('/eliminar_cliente_admin/:id', auth.auth, ClienteController.eliminar_cliente_admin);
api.get('/obtener_cliente_guest/:id', auth.auth, ClienteController.obtener_cliente_guest);
api.put('/actualizar_perfil_cliente_guest/:id', auth.auth, ClienteController.actualizar_perfil_cliente_guest);
module.exports = api;