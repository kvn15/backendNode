'use strict';

var Cupon = require('../models/cupon');

var registro_cupon_admin = function registro_cupon_admin(req, resp) {
  var data, reg;
  return regeneratorRuntime.async(function registro_cupon_admin$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!req.user) {
            _context.next = 12;
            break;
          }

          if (!(req.user.rol == 'admin')) {
            _context.next = 9;
            break;
          }

          data = req.body;
          _context.next = 5;
          return regeneratorRuntime.awrap(Cupon.create(data));

        case 5:
          reg = _context.sent;
          resp.status(200).send({
            data: reg
          });
          _context.next = 10;
          break;

        case 9:
          resp.status(500).send({
            message: 'No Acceso'
          });

        case 10:
          _context.next = 13;
          break;

        case 12:
          resp.status(500).send({
            message: 'No Acceso'
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
};

var listar_cupones_admin = function listar_cupones_admin(req, resp) {
  var filtro, reg;
  return regeneratorRuntime.async(function listar_cupones_admin$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!req.user) {
            _context2.next = 12;
            break;
          }

          if (!(req.user.rol = 'admin')) {
            _context2.next = 9;
            break;
          }

          filtro = req.params['filtro'];
          _context2.next = 5;
          return regeneratorRuntime.awrap(Cupon.find({
            codigo: new RegExp(filtro, 'i')
          }).sort({
            createdaT: -1
          }));

        case 5:
          reg = _context2.sent;
          resp.status(200).send({
            data: reg
          });
          _context2.next = 10;
          break;

        case 9:
          resp.status(500).send({
            message: 'No Acceso'
          });

        case 10:
          _context2.next = 13;
          break;

        case 12:
          resp.status(500).send({
            message: 'No Acceso'
          });

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var obtener_cupon_admin = function obtener_cupon_admin(req, resp) {
  var id, reg;
  return regeneratorRuntime.async(function obtener_cupon_admin$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (!req.user) {
            _context3.next = 18;
            break;
          }

          if (!(req.user.rol = 'admin')) {
            _context3.next = 15;
            break;
          }

          id = req.params['id'];
          _context3.prev = 3;
          _context3.next = 6;
          return regeneratorRuntime.awrap(Cupon.findById({
            _id: id
          }));

        case 6:
          reg = _context3.sent;
          resp.status(200).send({
            data: reg
          });
          _context3.next = 13;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](3);
          resp.status(200).send({
            data: undefined
          });

        case 13:
          _context3.next = 16;
          break;

        case 15:
          resp.status(500).send({
            message: 'No Acceso'
          });

        case 16:
          _context3.next = 19;
          break;

        case 18:
          resp.status(500).send({
            message: 'No Acceso'
          });

        case 19:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[3, 10]]);
};

var update_cupon_admin = function update_cupon_admin(req, resp) {
  var id, data, reg;
  return regeneratorRuntime.async(function update_cupon_admin$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          if (!req.user) {
            _context4.next = 13;
            break;
          }

          if (!(req.user.rol = 'admin')) {
            _context4.next = 10;
            break;
          }

          id = req.params['id'];
          data = req.body;
          _context4.next = 6;
          return regeneratorRuntime.awrap(Cupon.findByIdAndUpdate({
            _id: id
          }, {
            codigo: data.codigo,
            tipo: data.tipo,
            valor: data.valor,
            limite: data.limite
          }));

        case 6:
          reg = _context4.sent;
          resp.status(200).send({
            data: reg
          });
          _context4.next = 11;
          break;

        case 10:
          resp.status(500).send({
            message: 'No Acceso'
          });

        case 11:
          _context4.next = 14;
          break;

        case 13:
          resp.status(500).send({
            message: 'No Acceso'
          });

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  });
};

var eliminar_cupon_admin = function eliminar_cupon_admin(req, resp) {
  var id, reg;
  return regeneratorRuntime.async(function eliminar_cupon_admin$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          if (!req.user) {
            _context5.next = 12;
            break;
          }

          if (!(req.user.rol = 'admin')) {
            _context5.next = 9;
            break;
          }

          id = req.params['id'];
          _context5.next = 5;
          return regeneratorRuntime.awrap(Cupon.findByIdAndRemove({
            _id: id
          }));

        case 5:
          reg = _context5.sent;
          resp.status(200).send({
            data: reg
          });
          _context5.next = 10;
          break;

        case 9:
          resp.status(500).send({
            message: 'No Acceso'
          });

        case 10:
          _context5.next = 13;
          break;

        case 12:
          resp.status(500).send({
            message: 'No Acceso'
          });

        case 13:
        case "end":
          return _context5.stop();
      }
    }
  });
};

module.exports = {
  registro_cupon_admin: registro_cupon_admin,
  listar_cupones_admin: listar_cupones_admin,
  obtener_cupon_admin: obtener_cupon_admin,
  update_cupon_admin: update_cupon_admin,
  eliminar_cupon_admin: eliminar_cupon_admin
};