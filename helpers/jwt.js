'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
//contraseña para encryptar los datos
var secret = 'kevinblas';

//funcion que crea elñ token
exports.createToken = function(user){
    //genera token
    var payload = {
        sub: user._id,
        nombres: user.nombres,
        apellidos: user.apellidos,
        email: user.email,
        rol: user.rol,
        iat: moment().unix(),
        exp: moment().add(7,'days').unix()
    }

    return jwt.encode(payload,secret);

}