"use strict";

var Carrito = require('../models/carrito');

var agregar_carrito_cliente = function agregar_carrito_cliente(req, resp) {
  var data, carrito_cliente, reg;
  return regeneratorRuntime.async(function agregar_carrito_cliente$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!req.user) {
            _context.next = 15;
            break;
          }

          //guardamos la data
          data = req.body; //validar si el cliente agrega el mismo producto

          _context.next = 4;
          return regeneratorRuntime.awrap(Carrito.find({
            cliente: data.cliente,
            producto: data.producto
          }));

        case 4:
          carrito_cliente = _context.sent;

          if (!(carrito_cliente.length == 0)) {
            _context.next = 12;
            break;
          }

          _context.next = 8;
          return regeneratorRuntime.awrap(Carrito.create(data));

        case 8:
          reg = _context.sent;
          //devolver el registro
          resp.status(200).send({
            data: reg
          });
          _context.next = 13;
          break;

        case 12:
          if (carrito_cliente.length >= 1) {
            resp.status(200).send({
              data: undefined
            });
          }

        case 13:
          _context.next = 16;
          break;

        case 15:
          resp.status(500).send({
            message: 'No Acceso'
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = {
  agregar_carrito_cliente: agregar_carrito_cliente
};