"use strict";

var Config = require('../models/config');

var filesystem = require('fs');

var path = require('path');

var actualizar_config_admin = function actualizar_config_admin(req, resp) {
  var data, img_path, name, logo_name, reg, _reg;

  return regeneratorRuntime.async(function actualizar_config_admin$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!req.user) {
            _context.next = 23;
            break;
          }

          if (!(req.user.rol === 'admin')) {
            _context.next = 20;
            break;
          }

          data = req.body;

          if (!req.files) {
            _context.next = 14;
            break;
          }

          img_path = req.files.logo.path;
          name = img_path.split('\\');
          logo_name = name[2];
          _context.next = 9;
          return regeneratorRuntime.awrap(Config.findByIdAndUpdate({
            _id: "61f1831e158a4f120c288650"
          }, {
            categorias: JSON.parse(data.categorias),
            titulo: data.titulo,
            logo: logo_name,
            serie: data.serie,
            correlativo: data.correlativo
          }));

        case 9:
          reg = _context.sent;
          filesystem.stat('./uploads/configuraciones/' + reg.logo, function (err) {
            if (!err) {
              filesystem.unlink('./uploads/configuraciones/' + reg.logo, function (err) {
                if (err) throw err;
              });
            }
          });
          resp.status(200).send({
            data: reg
          });
          _context.next = 18;
          break;

        case 14:
          _context.next = 16;
          return regeneratorRuntime.awrap(Config.findByIdAndUpdate({
            _id: "61f1831e158a4f120c288650"
          }, {
            categorias: data.categorias,
            titulo: data.titulo,
            serie: data.serie,
            correlativo: data.correlativo
          }));

        case 16:
          _reg = _context.sent;
          resp.status(200).send({
            data: _reg
          });

        case 18:
          _context.next = 21;
          break;

        case 20:
          resp.status(500).send({
            message: 'No Acceso'
          });

        case 21:
          _context.next = 24;
          break;

        case 23:
          resp.status(500).send({
            message: 'No Acceso'
          });

        case 24:
        case "end":
          return _context.stop();
      }
    }
  });
};

var obtener_config_admin = function obtener_config_admin(req, resp) {
  var reg;
  return regeneratorRuntime.async(function obtener_config_admin$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!req.user) {
            _context2.next = 11;
            break;
          }

          if (!(req.user.rol === 'admin')) {
            _context2.next = 8;
            break;
          }

          _context2.next = 4;
          return regeneratorRuntime.awrap(Config.findById({
            _id: "61f1831e158a4f120c288650"
          }));

        case 4:
          reg = _context2.sent;
          resp.status(200).send({
            data: reg
          });
          _context2.next = 9;
          break;

        case 8:
          resp.status(500).send({
            message: 'No Acceso'
          });

        case 9:
          _context2.next = 12;
          break;

        case 11:
          resp.status(500).send({
            message: 'No Acceso'
          });

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var obtener_logo = function obtener_logo(req, resp) {
  var img;
  return regeneratorRuntime.async(function obtener_logo$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          //obtener nombre de la imagen
          img = req.params['img'];
          filesystem.stat('./uploads/configuraciones/' + img, function (err) {
            if (!err) {
              //mandar imagen
              var path_img = './uploads/configuraciones/' + img;
              resp.status(200).sendFile(path.resolve(path_img));
            } else {
              var _path_img = './uploads/default.jpg';
              resp.status(200).sendFile(path.resolve(_path_img));
            }
          });

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var obtener_config_public = function obtener_config_public(req, resp) {
  var reg;
  return regeneratorRuntime.async(function obtener_config_public$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Config.findById({
            _id: "61f1831e158a4f120c288650"
          }));

        case 2:
          reg = _context4.sent;
          resp.status(200).send({
            data: reg
          });

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
};

module.exports = {
  actualizar_config_admin: actualizar_config_admin,
  obtener_config_admin: obtener_config_admin,
  obtener_logo: obtener_logo,
  obtener_config_public: obtener_config_public
};