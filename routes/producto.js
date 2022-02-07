'use strict'

var express = require('express');
var ProductoController = require('../controllers/ProductoController');

var api = express.Router();
var auth = require('../middlewares/authenticate');
var multiparty = require('connect-multiparty')
var path = multiparty({uploadDir: './uploads/productos'})

api.post('/registro_producto_admin', [auth.auth, path], ProductoController.registro_producto_admin);
api.get('/listar_producto_admin/:filtro?', [auth.auth], ProductoController.listar_producto_admin)
api.get('/obtener_portada/:img',ProductoController.obtener_portada)
api.get('/obtener_producto_admin/:id', auth.auth, ProductoController.obtener_producto_admin);
api.put('/actualizar_producto_admin/:id', [auth.auth, path], ProductoController.actualizar_producto_admin);
api.delete('/eliminar_producto_admin/:id', [auth.auth, path], ProductoController.eliminar_producto_admin);
api.put('/actualizar_producto_variedades_admin/:id',auth.auth,ProductoController.actualizar_producto_variedades_admin);
api.put('/agregar_imagen_galeria_admin/:id',[auth.auth, path],ProductoController.agregar_imagen_galeria_admin);
api.put('/eliminar_imagen_galeria_admin/:id',auth.auth,ProductoController.eliminar_imagen_galeria_admin);


//inventario

api.get('/listar_inventario_producto_admin/:id', auth.auth, ProductoController.listar_inventario_producto_admin);
api.delete('/eliminar_inventario_producto_admin/:id', auth.auth, ProductoController.eliminar_inventario_producto_admin);
api.post('/registro_inventario_producto_admin', auth.auth, ProductoController.registro_inventario_producto_admin);


//PUBLICOS
api.get('/listar_producto_publico/:filtro?', ProductoController.listar_producto_publico);
api.get('/obtener_producto_publico_slug/:slug?', ProductoController.obtener_producto_publico_slug);
api.get('/listar_producto_recomendado_publico/:categoria?', ProductoController.listar_producto_recomendado_publico);


module.exports = api;