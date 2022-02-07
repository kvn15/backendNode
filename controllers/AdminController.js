'use strict'

var Admin = require('../models/admin');
var bcryct = require('bcrypt-nodejs')
var jwt = require('../helpers/jwt');

const registro_admin= async function(req, resp){

    var data = req.body;
    var admin_arr = [];
    
    // var data = {
    //     nombres: "Kevin" ,
    //     apellidos: "Blas",
    //     email: "cblash14@gmail.com",
    //     password: "941165733kbh",
    //     telefono: "941165733",
    //     rol: "admin",
    //     dni: "73897044",
    // }

    //validar el correo
    admin_arr = await Admin.find({email: data.email});

    if (admin_arr.length === 0) {
        //validar si hay contraseña
        if (data.password) {
            //encriptar contraseña
            bcryct.hash(data.password, null, null, async function(err, hash){
                //validar si se encrypto la contraseña
                if (hash) {
                    //registro
                    data.password = hash;
                    var reg = await Admin.create(data);
                    resp.status(200).send({data: reg});
                }else{
                    resp.status(200).send({message: 'ErrorServer', data: undefined});
                }
            })
        }else{
            resp.status(200).send({message: 'No hay una Contraseña', data: undefined});
        }

    }else{
        resp.status(200).send({message: 'El correo ya existe en la Base de Datos', data: undefined});
    }

}


const login_admin = async function(req , res){
    var data = req.body;
    var admin_arr = [];

    admin_arr = await Admin.find({email: data.email});

    if (admin_arr.length == 0) {
        res.status(200).send({message: 'No se encontro el correo', data: undefined})
    }else{
        //login
        let user = admin_arr[0];

        bcryct.compare(data.password, user.password, async function(error, check){
            if (check) {
                res.status(200).send({
                    data:user,
                    token: jwt.createToken(user)
                });
            }else{
                res.status(200).send({message: 'La contraseña no coincide', data: undefined})
            }
        });

    }

}


module.exports = {
    registro_admin,
    login_admin
}