'use strict';

var Cliente = require('../models/cliente');

var bcryct = require('bcrypt-nodejs');

var jwt = require('../helpers/jwt');

var registro_cliente = function registro_cliente(req, resp) {
  var data, clientes_arr;
  return regeneratorRuntime.async(function registro_cliente$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          data = req.body;
          clientes_arr = []; //validar el correo

          _context2.next = 4;
          return regeneratorRuntime.awrap(Cliente.find({
            email: data.email
          }));

        case 4:
          clientes_arr = _context2.sent;

          if (clientes_arr.length === 0) {
            //validar si hay contraseña
            if (data.password) {
              //encriptar contraseña
              bcryct.hash(data.password, null, null, function _callee(err, hash) {
                var reg;
                return regeneratorRuntime.async(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!hash) {
                          _context.next = 8;
                          break;
                        }

                        //registro
                        data.password = hash;
                        _context.next = 4;
                        return regeneratorRuntime.awrap(Cliente.create(data));

                      case 4:
                        reg = _context.sent;
                        resp.status(200).send({
                          data: reg
                        });
                        _context.next = 9;
                        break;

                      case 8:
                        resp.status(200).send({
                          message: 'ErrorServer',
                          data: undefined
                        });

                      case 9:
                      case "end":
                        return _context.stop();
                    }
                  }
                });
              });
            } else {
              resp.status(200).send({
                message: 'No hay una Contraseña',
                data: undefined
              });
            }
          } else {
            resp.status(200).send({
              message: 'El correo ya existe en la Base de Datos',
              data: undefined
            });
          }

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var login_cliente = function login_cliente(req, res) {
  var data, cliente_arr, user;
  return regeneratorRuntime.async(function login_cliente$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          data = req.body;
          cliente_arr = [];
          _context4.next = 4;
          return regeneratorRuntime.awrap(Cliente.find({
            email: data.email
          }));

        case 4:
          cliente_arr = _context4.sent;

          if (cliente_arr.length == 0) {
            res.status(200).send({
              message: 'No se encontro el correo',
              data: undefined
            });
          } else {
            //login
            user = cliente_arr[0];
            bcryct.compare(data.password, user.password, function _callee2(error, check) {
              return regeneratorRuntime.async(function _callee2$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      if (check) {
                        res.status(200).send({
                          data: user,
                          token: jwt.createToken(user)
                        });
                      } else {
                        res.status(200).send({
                          message: 'La contraseña no coincide',
                          data: undefined
                        });
                      }

                    case 1:
                    case "end":
                      return _context3.stop();
                  }
                }
              });
            });
          }

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
};

var listar_clientes_filtro_admin = function listar_clientes_filtro_admin(req, res) {
  var tipo, filtro, registros, reg, _reg;

  return regeneratorRuntime.async(function listar_clientes_filtro_admin$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          if (!req.user) {
            _context5.next = 28;
            break;
          }

          if (!(req.user.rol === 'admin')) {
            _context5.next = 25;
            break;
          }

          tipo = req.params['tipo'];
          filtro = req.params['filtro'];

          if (!(tipo == null || tipo == 'null')) {
            _context5.next = 11;
            break;
          }

          _context5.next = 7;
          return regeneratorRuntime.awrap(Cliente.find());

        case 7:
          registros = _context5.sent;
          res.status(200).send({
            data: registros
          });
          _context5.next = 23;
          break;

        case 11:
          if (!(tipo == 'apellidos')) {
            _context5.next = 18;
            break;
          }

          _context5.next = 14;
          return regeneratorRuntime.awrap(Cliente.find({
            apellidos: new RegExp(filtro, 'i')
          }));

        case 14:
          reg = _context5.sent;
          res.status(200).send({
            data: reg
          });
          _context5.next = 23;
          break;

        case 18:
          if (!(tipo == 'email')) {
            _context5.next = 23;
            break;
          }

          _context5.next = 21;
          return regeneratorRuntime.awrap(Cliente.find({
            email: new RegExp(filtro, 'i')
          }));

        case 21:
          _reg = _context5.sent;
          res.status(200).send({
            data: _reg
          });

        case 23:
          _context5.next = 26;
          break;

        case 25:
          res.status(500).send({
            message: 'No Acceso'
          });

        case 26:
          _context5.next = 29;
          break;

        case 28:
          res.status(500).send({
            message: 'No Acceso'
          });

        case 29:
        case "end":
          return _context5.stop();
      }
    }
  });
};

var registro_cliente_admin = function registro_cliente_admin(req, res) {
  var data;
  return regeneratorRuntime.async(function registro_cliente_admin$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          if (req.user) {
            if (req.user.rol === 'admin') {
              data = req.body;
              bcryct.hash('123456789', null, null, function _callee3(err, hash) {
                var reg;
                return regeneratorRuntime.async(function _callee3$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        if (!hash) {
                          _context6.next = 8;
                          break;
                        }

                        data.password = hash;
                        _context6.next = 4;
                        return regeneratorRuntime.awrap(Cliente.create(data));

                      case 4:
                        reg = _context6.sent;
                        res.status(200).send({
                          data: reg
                        });
                        _context6.next = 9;
                        break;

                      case 8:
                        res.status(200).send({
                          message: 'Hubo un error en el servidor',
                          data: undefined
                        });

                      case 9:
                      case "end":
                        return _context6.stop();
                    }
                  }
                });
              });
            } else {
              res.status(500).send({
                message: 'No Acceso'
              });
            }
          } else {
            res.status(500).send({
              message: 'No Acceso'
            });
          }

        case 1:
        case "end":
          return _context7.stop();
      }
    }
  });
};

var obtener_cliente_admin = function obtener_cliente_admin(req, res) {
  var id;
  return regeneratorRuntime.async(function obtener_cliente_admin$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          if (!req.user) {
            _context8.next = 18;
            break;
          }

          if (!(req.user.rol === 'admin')) {
            _context8.next = 15;
            break;
          }

          id = req.params['id'];
          _context8.prev = 3;
          _context8.next = 6;
          return regeneratorRuntime.awrap(Cliente.findById({
            _id: id
          }));

        case 6:
          req = _context8.sent;
          res.status(200).send({
            data: req
          });
          _context8.next = 13;
          break;

        case 10:
          _context8.prev = 10;
          _context8.t0 = _context8["catch"](3);
          res.status(200).send({
            data: undefined
          });

        case 13:
          _context8.next = 16;
          break;

        case 15:
          res.status(500).send({
            message: 'No Acceso'
          });

        case 16:
          _context8.next = 19;
          break;

        case 18:
          res.status(500).send({
            message: 'No Acceso'
          });

        case 19:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[3, 10]]);
};

var obtener_cliente_guest = function obtener_cliente_guest(req, res) {
  var id;
  return regeneratorRuntime.async(function obtener_cliente_guest$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          if (!req.user) {
            _context9.next = 14;
            break;
          }

          id = req.params['id'];
          _context9.prev = 2;
          _context9.next = 5;
          return regeneratorRuntime.awrap(Cliente.findById({
            _id: id
          }));

        case 5:
          req = _context9.sent;
          res.status(200).send({
            data: req
          });
          _context9.next = 12;
          break;

        case 9:
          _context9.prev = 9;
          _context9.t0 = _context9["catch"](2);
          res.status(200).send({
            data: undefined
          });

        case 12:
          _context9.next = 15;
          break;

        case 14:
          res.status(500).send({
            message: 'No Acceso'
          });

        case 15:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[2, 9]]);
};

var actualizar_cliente_admin = function actualizar_cliente_admin(req, res) {
  var id, data;
  return regeneratorRuntime.async(function actualizar_cliente_admin$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          if (!req.user) {
            _context10.next = 13;
            break;
          }

          if (!(req.user.rol === 'admin')) {
            _context10.next = 10;
            break;
          }

          id = req.params['id'];
          data = req.body;
          _context10.next = 6;
          return regeneratorRuntime.awrap(Cliente.findByIdAndUpdate({
            _id: id
          }, {
            nombres: data.nombres,
            apellidos: data.apellidos,
            email: data.email,
            telefono: data.telefono,
            f_nacimiento: data.f_nacimiento,
            dni: data.dni,
            genero: data.genero
          }));

        case 6:
          req = _context10.sent;
          res.status(200).send({
            data: req
          });
          _context10.next = 11;
          break;

        case 10:
          res.status(500).send({
            message: 'No Acceso'
          });

        case 11:
          _context10.next = 14;
          break;

        case 13:
          res.status(500).send({
            message: 'No Acceso'
          });

        case 14:
        case "end":
          return _context10.stop();
      }
    }
  });
};

var eliminar_cliente_admin = function eliminar_cliente_admin(req, res) {
  var id, reg;
  return regeneratorRuntime.async(function eliminar_cliente_admin$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          if (!req.user) {
            _context11.next = 12;
            break;
          }

          if (!(req.user.rol === 'admin')) {
            _context11.next = 9;
            break;
          }

          id = req.params['id'];
          _context11.next = 5;
          return regeneratorRuntime.awrap(Cliente.findByIdAndRemove({
            _id: id
          }));

        case 5:
          reg = _context11.sent;
          res.status(200).send({
            data: reg
          });
          _context11.next = 10;
          break;

        case 9:
          res.status(500).send({
            message: 'No Acceso'
          });

        case 10:
          _context11.next = 13;
          break;

        case 12:
          res.status(500).send({
            message: 'No Acceso'
          });

        case 13:
        case "end":
          return _context11.stop();
      }
    }
  });
};

var actualizar_perfil_cliente_guest = function actualizar_perfil_cliente_guest(req, res) {
  var id, data, reg;
  return regeneratorRuntime.async(function actualizar_perfil_cliente_guest$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          if (!req.user) {
            _context13.next = 13;
            break;
          }

          id = req.params['id'];
          data = req.body;

          if (!data.password) {
            _context13.next = 7;
            break;
          }

          //encryptar contraseña
          bcryct.hash(data.password, null, null, function _callee4(err, hash) {
            var reg;
            return regeneratorRuntime.async(function _callee4$(_context12) {
              while (1) {
                switch (_context12.prev = _context12.next) {
                  case 0:
                    _context12.next = 2;
                    return regeneratorRuntime.awrap(Cliente.findByIdAndUpdate({
                      _id: id
                    }, {
                      nombres: data.nombres,
                      apellidos: data.apellidos,
                      telefono: data.telefono,
                      f_nacimiento: data.f_nacimiento,
                      dni: data.dni,
                      genero: data.genero,
                      pais: data.pais,
                      password: hash
                    }));

                  case 2:
                    reg = _context12.sent;
                    res.status(200).send({
                      data: reg
                    });

                  case 4:
                  case "end":
                    return _context12.stop();
                }
              }
            });
          });
          _context13.next = 11;
          break;

        case 7:
          _context13.next = 9;
          return regeneratorRuntime.awrap(Cliente.findByIdAndUpdate({
            _id: id
          }, {
            nombres: data.nombres,
            apellidos: data.apellidos,
            telefono: data.telefono,
            f_nacimiento: data.f_nacimiento,
            dni: data.dni,
            genero: data.genero,
            pais: data.pais
          }));

        case 9:
          reg = _context13.sent;
          res.status(200).send({
            data: reg
          });

        case 11:
          _context13.next = 14;
          break;

        case 13:
          res.status(500).send({
            message: 'No Acceso'
          });

        case 14:
        case "end":
          return _context13.stop();
      }
    }
  });
};

module.exports = {
  registro_cliente: registro_cliente,
  login_cliente: login_cliente,
  listar_clientes_filtro_admin: listar_clientes_filtro_admin,
  registro_cliente_admin: registro_cliente_admin,
  obtener_cliente_admin: obtener_cliente_admin,
  actualizar_cliente_admin: actualizar_cliente_admin,
  eliminar_cliente_admin: eliminar_cliente_admin,
  obtener_cliente_guest: obtener_cliente_guest,
  actualizar_perfil_cliente_guest: actualizar_perfil_cliente_guest
};