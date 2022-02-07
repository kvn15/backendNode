'use strict'; //usara el paquete de express

var express = require('express'); //inicializa el express


var app = express();

var bodyparser = require('body-parser'); //conexion a la BD


var mongoose = require('mongoose'); //var para el puerto de ejecucion del backend


var port = process.env.PORT || 4201;

var cliente_route = require('./routes/cliente');

var admin_route = require('./routes/admin');

var producto_route = require('./routes/producto');

var cupon_route = require('./routes/cupon');

var config_route = require('./routes/config');

var carrito_route = require('./routes/carrito');

mongoose.connect('mongodb://127.0.0.1:27017/tienda', {
  useUnifiedTopology: true,
  useNewUrlParser: true
}, function (err, resp) {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, function () {
      console.log('Servidor Corriendo en el puerto ' + port);
    });
  }
}); //nos permitira obtener datos en un json

app.use(bodyparser.urlencoded({
  extended: true
})); //analize el objeto json

app.use(bodyparser.json({
  limit: '50mb',
  extended: true
})); //permisos de cors

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Allow', 'GET, PUT, POST, DELETE, OPTIONS');
  next();
}); //definir la api y mandamos la ruta

app.use('/api', cliente_route);
app.use('/api', admin_route);
app.use('/api', producto_route);
app.use('/api', cupon_route);
app.use('/api', config_route);
app.use('/api', carrito_route); //exportar el app.js

module.exports = app;