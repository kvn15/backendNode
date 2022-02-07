'use strick'
//protejer rutas con token

var jwt = require('jwt-simple');
//moment crearemos la fecha actual y la fecha de expiracion
var moment = require('moment');
var secret = 'kevinblas';

//crearemos una funcion que sera exportada
exports.auth = function (req, res, next) { 

    //verificar tokens
    //obtener cabezera
    if (!req.headers.authorization) {
        return res.status(403).send({message: 'NoHeadersError'})
    }

    //con el replace: reemplazaremos algunos caracteres para que no salga error
    var token = req.headers.authorization.replace(/['"]+/g,'');

    //se partira el token
    var segment = token.split('.');

    // console.log(token);
    // console.log(segment);
    //validar si el token tiene 3 partes (array con 3 campos)
    if (segment.length !== 3) {
        return res.status(403).send({message: 'Invalid Token'})
    }else{
        try {
            //decodificar token
            var payload = jwt.decode(token, secret);
            //validar si el token a expirado
            if (payload.exp <= moment.unix()) {
                return res.status(403).send({message: 'Token expirado'})
            }
        } catch (error) {
            return res.status(403).send({message: 'Invalid Token'})
        }
    }

    req.user = payload;

    next();
}