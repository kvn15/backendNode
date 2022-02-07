'use strict';

var Producto = require('../models/producto');

var Inventario = require('../models/inventario'); //manejador de archivos


var filesystem = require('fs');

var path = require('path');

var registro_producto_admin = function registro_producto_admin(req, resp) {
  var data, img_path, name, portada_name, reg, inventario;
  return regeneratorRuntime.async(function registro_producto_admin$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!req.user) {
            _context.next = 20;
            break;
          }

          if (!(req.user.rol = 'admin')) {
            _context.next = 17;
            break;
          }

          data = req.body; //obtener image
          // console.log(data);
          // console.log(req.files);

          img_path = req.files.portada.path;
          name = img_path.split('\\');
          portada_name = name[2];
          data.portada = portada_name; //convierte titulo en slug(url)

          data.slug = data.titulo.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
          _context.next = 10;
          return regeneratorRuntime.awrap(Producto.create(data));

        case 10:
          reg = _context.sent;
          _context.next = 13;
          return regeneratorRuntime.awrap(Inventario.create({
            //sub: se crea en el helper
            admin: req.user.sub,
            cantidad: data.stock,
            proveedor: 'Primer Registro',
            producto: reg._id
          }));

        case 13:
          inventario = _context.sent;
          resp.status(200).send({
            data: reg,
            inventario: inventario
          });
          _context.next = 18;
          break;

        case 17:
          resp.status(500).send({
            message: 'No Acceso'
          });

        case 18:
          _context.next = 21;
          break;

        case 20:
          resp.status(500).send({
            message: 'No Acceso'
          });

        case 21:
        case "end":
          return _context.stop();
      }
    }
  });
};

var listar_producto_admin = function listar_producto_admin(req, resp) {
  var filtro, reg;
  return regeneratorRuntime.async(function listar_producto_admin$(_context2) {
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
          return regeneratorRuntime.awrap(Producto.find({
            titulo: new RegExp(filtro, 'i')
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

var obtener_portada = function obtener_portada(req, resp) {
  var img;
  return regeneratorRuntime.async(function obtener_portada$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          //obtener nombre de la imagen
          img = req.params['img'];
          console.log(img);
          filesystem.stat('./uploads/productos/' + img, function (err) {
            if (!err) {
              //mandar imagen
              var path_img = './uploads/productos/' + img;
              resp.status(200).sendFile(path.resolve(path_img));
            } else {
              var _path_img = './uploads/default.jpg';
              resp.status(200).sendFile(path.resolve(_path_img));
            }
          });

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var obtener_producto_admin = function obtener_producto_admin(req, res) {
  var id;
  return regeneratorRuntime.async(function obtener_producto_admin$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          if (!req.user) {
            _context4.next = 18;
            break;
          }

          if (!(req.user.rol === 'admin')) {
            _context4.next = 15;
            break;
          }

          id = req.params['id'];
          _context4.prev = 3;
          _context4.next = 6;
          return regeneratorRuntime.awrap(Producto.findById({
            _id: id
          }));

        case 6:
          req = _context4.sent;
          res.status(200).send({
            data: req
          });
          _context4.next = 13;
          break;

        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](3);
          res.status(200).send({
            data: undefined
          });

        case 13:
          _context4.next = 16;
          break;

        case 15:
          res.status(500).send({
            message: 'No Acceso'
          });

        case 16:
          _context4.next = 19;
          break;

        case 18:
          res.status(500).send({
            message: 'No Acceso'
          });

        case 19:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[3, 10]]);
};

var actualizar_producto_admin = function actualizar_producto_admin(req, resp) {
  var id, data, img_path, name, portada_name, reg, _reg;

  return regeneratorRuntime.async(function actualizar_producto_admin$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          if (!req.user) {
            _context5.next = 24;
            break;
          }

          if (!(req.user.rol = 'admin')) {
            _context5.next = 21;
            break;
          }

          id = req.params['id'];
          data = req.body;

          if (!req.files) {
            _context5.next = 15;
            break;
          }

          //si hay imagen
          img_path = req.files.portada.path;
          name = img_path.split('\\');
          portada_name = name[2];
          _context5.next = 10;
          return regeneratorRuntime.awrap(Producto.findByIdAndUpdate({
            _id: id
          }, {
            titulo: data.titulo,
            stock: data.stock,
            slug: data.titulo.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
            precio: data.precio,
            categoria: data.categoria,
            descripcion: data.descripcion,
            contenido: data.contenido,
            portada: portada_name
          }));

        case 10:
          reg = _context5.sent;
          filesystem.stat('./uploads/productos/' + reg.portada, function (err) {
            if (!err) {
              filesystem.unlink('./uploads/productos/' + reg.portada, function (err) {
                if (err) throw err;
              });
            }
          });
          resp.status(200).send({
            data: reg
          });
          _context5.next = 19;
          break;

        case 15:
          _context5.next = 17;
          return regeneratorRuntime.awrap(Producto.findByIdAndUpdate({
            _id: id
          }, {
            titulo: data.titulo,
            stock: data.stock,
            slug: data.titulo.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
            precio: data.precio,
            categoria: data.categoria,
            descripcion: data.descripcion,
            contenido: data.contenido
          }));

        case 17:
          _reg = _context5.sent;
          resp.status(200).send({
            data: _reg
          });

        case 19:
          _context5.next = 22;
          break;

        case 21:
          resp.status(500).send({
            message: 'No Acceso'
          });

        case 22:
          _context5.next = 25;
          break;

        case 24:
          resp.status(500).send({
            message: 'No Acceso'
          });

        case 25:
        case "end":
          return _context5.stop();
      }
    }
  });
};

var eliminar_producto_admin = function eliminar_producto_admin(req, res) {
  var id, reg;
  return regeneratorRuntime.async(function eliminar_producto_admin$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          if (!req.user) {
            _context6.next = 13;
            break;
          }

          if (!(req.user.rol === 'admin')) {
            _context6.next = 10;
            break;
          }

          id = req.params['id'];
          _context6.next = 5;
          return regeneratorRuntime.awrap(Producto.findByIdAndRemove({
            _id: id
          }));

        case 5:
          reg = _context6.sent;
          filesystem.stat('./uploads/productos/' + reg.portada, function (err) {
            if (!err) {
              filesystem.unlink('./uploads/productos/' + reg.portada, function (err) {
                if (err) throw err;
              });
            }
          });
          res.status(200).send({
            data: reg
          });
          _context6.next = 11;
          break;

        case 10:
          res.status(500).send({
            message: 'No Acceso'
          });

        case 11:
          _context6.next = 14;
          break;

        case 13:
          res.status(500).send({
            message: 'No Acceso'
          });

        case 14:
        case "end":
          return _context6.stop();
      }
    }
  });
};

var listar_inventario_producto_admin = function listar_inventario_producto_admin(req, resp) {
  var id, reg;
  return regeneratorRuntime.async(function listar_inventario_producto_admin$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          if (!req.user) {
            _context7.next = 12;
            break;
          }

          if (!(req.user.rol === 'admin')) {
            _context7.next = 9;
            break;
          }

          id = req.params['id']; //busca por id producto
          //populate es como el Inner Join
          //sort metodo para ordenar

          _context7.next = 5;
          return regeneratorRuntime.awrap(Inventario.find({
            producto: id
          }).populate('admin').sort({
            createdaT: -1
          }));

        case 5:
          reg = _context7.sent;
          resp.status(200).send({
            data: reg
          });
          _context7.next = 10;
          break;

        case 9:
          resp.status(500).send({
            message: 'No Acceso'
          });

        case 10:
          _context7.next = 13;
          break;

        case 12:
          resp.status(500).send({
            message: 'No Acceso'
          });

        case 13:
        case "end":
          return _context7.stop();
      }
    }
  });
};

var eliminar_inventario_producto_admin = function eliminar_inventario_producto_admin(req, resp) {
  var id, reg, prod, nuevoStock, producto;
  return regeneratorRuntime.async(function eliminar_inventario_producto_admin$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          if (!req.user) {
            _context8.next = 19;
            break;
          }

          if (!(req.user.rol === 'admin')) {
            _context8.next = 16;
            break;
          }

          //Obtener id del inventario
          id = req.params['id']; //Eliminando el Inventario

          _context8.next = 5;
          return regeneratorRuntime.awrap(Inventario.findByIdAndRemove({
            _id: id
          }));

        case 5:
          reg = _context8.sent;
          _context8.next = 8;
          return regeneratorRuntime.awrap(Producto.findById({
            _id: reg.producto
          }));

        case 8:
          prod = _context8.sent;
          //calcular nuevo Stock
          nuevoStock = parseInt(prod.stock) - parseInt(reg.cantidad); //Actualizacion del nuevo stock al producto

          _context8.next = 12;
          return regeneratorRuntime.awrap(Producto.findByIdAndUpdate({
            _id: reg.producto
          }, {
            stock: nuevoStock
          }));

        case 12:
          producto = _context8.sent;
          resp.status(200).send({
            data: producto
          });
          _context8.next = 17;
          break;

        case 16:
          resp.status(500).send({
            message: 'No Acceso'
          });

        case 17:
          _context8.next = 20;
          break;

        case 19:
          resp.status(500).send({
            message: 'No Acceso'
          });

        case 20:
        case "end":
          return _context8.stop();
      }
    }
  });
};

var registro_inventario_producto_admin = function registro_inventario_producto_admin(req, resp) {
  var data, reg, prod, nuevoStock, producto;
  return regeneratorRuntime.async(function registro_inventario_producto_admin$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          if (!req.user) {
            _context9.next = 19;
            break;
          }

          if (!(req.user.rol === 'admin')) {
            _context9.next = 16;
            break;
          }

          data = req.body;
          _context9.next = 5;
          return regeneratorRuntime.awrap(Inventario.create(data));

        case 5:
          reg = _context9.sent;
          _context9.next = 8;
          return regeneratorRuntime.awrap(Producto.findById({
            _id: reg.producto
          }));

        case 8:
          prod = _context9.sent;
          //CALCULAR NUEVO STOCK
          //STOCK ACTUAL         //STOCK A AUMENTAR
          nuevoStock = parseInt(prod.stock) + parseInt(reg.cantidad); //ACTUALIZAR NUEVO STOCK

          _context9.next = 12;
          return regeneratorRuntime.awrap(Producto.findByIdAndUpdate({
            _id: reg.producto
          }, {
            stock: nuevoStock
          }));

        case 12:
          producto = _context9.sent;
          resp.status(200).send({
            data: reg
          });
          _context9.next = 17;
          break;

        case 16:
          resp.status(500).send({
            message: 'No Acceso'
          });

        case 17:
          _context9.next = 20;
          break;

        case 19:
          resp.status(500).send({
            message: 'No Acceso'
          });

        case 20:
        case "end":
          return _context9.stop();
      }
    }
  });
};

var actualizar_producto_variedades_admin = function actualizar_producto_variedades_admin(req, resp) {
  var id, data, reg;
  return regeneratorRuntime.async(function actualizar_producto_variedades_admin$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          if (!req.user) {
            _context10.next = 13;
            break;
          }

          if (!(req.user.rol = 'admin')) {
            _context10.next = 10;
            break;
          }

          id = req.params['id'];
          data = req.body;
          _context10.next = 6;
          return regeneratorRuntime.awrap(Producto.findByIdAndUpdate({
            _id: id
          }, {
            titulo_variedad: data.titulo_variedad,
            variedades: data.variedades
          }));

        case 6:
          reg = _context10.sent;
          resp.status(200).send({
            data: reg
          });
          _context10.next = 11;
          break;

        case 10:
          resp.status(500).send({
            message: 'No Acceso'
          });

        case 11:
          _context10.next = 14;
          break;

        case 13:
          resp.status(500).send({
            message: 'No Acceso'
          });

        case 14:
        case "end":
          return _context10.stop();
      }
    }
  });
};

var agregar_imagen_galeria_admin = function agregar_imagen_galeria_admin(req, resp) {
  var id, data, img_path, name, imagen_name, reg;
  return regeneratorRuntime.async(function agregar_imagen_galeria_admin$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          if (!req.user) {
            _context11.next = 16;
            break;
          }

          if (!(req.user.rol = 'admin')) {
            _context11.next = 13;
            break;
          }

          id = req.params['id'];
          data = req.body;
          img_path = req.files.imagen.path;
          name = img_path.split('\\');
          imagen_name = name[2];
          _context11.next = 9;
          return regeneratorRuntime.awrap(Producto.findByIdAndUpdate({
            _id: id
          }, {
            //metodo para agregar un elemento al array
            $push: {
              galeria: {
                imagen: imagen_name,
                _id: data._id
              }
            }
          }));

        case 9:
          reg = _context11.sent;
          resp.status(200).send({
            data: reg
          });
          _context11.next = 14;
          break;

        case 13:
          resp.status(500).send({
            message: 'No Acceso'
          });

        case 14:
          _context11.next = 17;
          break;

        case 16:
          resp.status(500).send({
            message: 'No Acceso'
          });

        case 17:
        case "end":
          return _context11.stop();
      }
    }
  });
};

var eliminar_imagen_galeria_admin = function eliminar_imagen_galeria_admin(req, resp) {
  var id, data, reg;
  return regeneratorRuntime.async(function eliminar_imagen_galeria_admin$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          if (!req.user) {
            _context12.next = 13;
            break;
          }

          if (!(req.user.rol = 'admin')) {
            _context12.next = 10;
            break;
          }

          id = req.params['id'];
          data = req.body;
          _context12.next = 6;
          return regeneratorRuntime.awrap(Producto.findByIdAndUpdate({
            _id: id
          }, {
            //meotodo para poder eliminar
            $pull: {
              galeria: {
                _id: data._id
              }
            }
          }));

        case 6:
          reg = _context12.sent;
          resp.status(200).send({
            data: reg
          });
          _context12.next = 11;
          break;

        case 10:
          resp.status(500).send({
            message: 'No Acceso'
          });

        case 11:
          _context12.next = 14;
          break;

        case 13:
          resp.status(500).send({
            message: 'No Acceso'
          });

        case 14:
        case "end":
          return _context12.stop();
      }
    }
  });
}; //----METODOS PUBLICOS.-------------


var listar_producto_publico = function listar_producto_publico(req, resp) {
  var filtro, reg;
  return regeneratorRuntime.async(function listar_producto_publico$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          filtro = req.params['filtro'];
          _context13.next = 3;
          return regeneratorRuntime.awrap(Producto.find({
            titulo: new RegExp(filtro, 'i')
          }).sort({
            createdaT: -1
          }));

        case 3:
          reg = _context13.sent;
          resp.status(200).send({
            data: reg
          });

        case 5:
        case "end":
          return _context13.stop();
      }
    }
  });
};

var obtener_producto_publico_slug = function obtener_producto_publico_slug(req, resp) {
  var slug, reg;
  return regeneratorRuntime.async(function obtener_producto_publico_slug$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          slug = req.params['slug'];
          _context14.next = 3;
          return regeneratorRuntime.awrap(Producto.findOne({
            slug: slug
          }));

        case 3:
          reg = _context14.sent;
          resp.status(200).send({
            data: reg
          });

        case 5:
        case "end":
          return _context14.stop();
      }
    }
  });
};

var listar_producto_recomendado_publico = function listar_producto_recomendado_publico(req, resp) {
  var categoria, reg;
  return regeneratorRuntime.async(function listar_producto_recomendado_publico$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          categoria = req.params['categoria'];
          _context15.next = 3;
          return regeneratorRuntime.awrap(Producto.find({
            categoria: categoria
          }).sort({
            createdaT: -1
          }).limit(8));

        case 3:
          reg = _context15.sent;
          resp.status(200).send({
            data: reg
          });

        case 5:
        case "end":
          return _context15.stop();
      }
    }
  });
};

module.exports = {
  registro_producto_admin: registro_producto_admin,
  listar_producto_admin: listar_producto_admin,
  obtener_portada: obtener_portada,
  obtener_producto_admin: obtener_producto_admin,
  actualizar_producto_admin: actualizar_producto_admin,
  eliminar_producto_admin: eliminar_producto_admin,
  listar_inventario_producto_admin: listar_inventario_producto_admin,
  eliminar_inventario_producto_admin: eliminar_inventario_producto_admin,
  registro_inventario_producto_admin: registro_inventario_producto_admin,
  actualizar_producto_variedades_admin: actualizar_producto_variedades_admin,
  agregar_imagen_galeria_admin: agregar_imagen_galeria_admin,
  eliminar_imagen_galeria_admin: eliminar_imagen_galeria_admin,
  listar_producto_publico: listar_producto_publico,
  obtener_producto_publico_slug: obtener_producto_publico_slug,
  listar_producto_recomendado_publico: listar_producto_recomendado_publico
};