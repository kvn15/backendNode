'use strict'

var Cliente = require('../models/cliente');
var bcryct = require('bcrypt-nodejs');
const jwt = require('../helpers/jwt');

const registro_cliente = async function(req, resp){

    var data = req.body;
    var clientes_arr = [];

    //validar el correo
    clientes_arr = await Cliente.find({email: data.email});

    if (clientes_arr.length === 0) {

        //validar si hay contraseña
        if (data.password) {
            //encriptar contraseña
            bcryct.hash(data.password, null, null, async function(err, hash){
                //validar si se encrypto la contraseña
                if (hash) {
                    //registro
                    data.password = hash;
                    var reg = await Cliente.create(data);
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

const login_cliente = async function(req , res){
    var data = req.body;
    var cliente_arr = [];

    cliente_arr = await Cliente.find({email: data.email});

    if (cliente_arr.length == 0) {
        res.status(200).send({message: 'No se encontro el correo', data: undefined})
    }else{
        //login
        let user = cliente_arr[0];

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

const listar_clientes_filtro_admin = async function (req, res) {
    //Realizamos los permisos para que puedan usar este metodo en una peticion
    //validar si hay req.user del token autehnticado
    if (req.user) {
        if (req.user.rol === 'admin') {
            let tipo = req.params['tipo'];
            let filtro = req.params['filtro'];

            if (tipo == null || tipo == 'null') {
                let registros = await Cliente.find();
                res.status(200).send({data: registros})
            }else{
                
                if (tipo == 'apellidos') {
                    let reg = await Cliente.find({apellidos: new RegExp(filtro, 'i')});

                    res.status(200).send({data: reg})
                }else if (tipo == 'email') {
                    let reg = await Cliente.find({email: new RegExp(filtro, 'i')});

                    res.status(200).send({data: reg})
                }

            }
        }else{
            res.status(500).send({message: 'No Acceso'})
        }
    }else{
        res.status(500).send({message: 'No Acceso'})  
    }

}

const registro_cliente_admin = async function (req, res) {
    if (req.user) {
        if (req.user.rol === 'admin') {

            var data = req.body;

            bcryct.hash('123456789', null,null, async function (err,hash) {
                if (hash) {
                    data.password = hash;

                    let reg = await Cliente.create(data);

                    res.status(200).send({data: reg})
                }else{
                    res.status(200).send({message: 'Hubo un error en el servidor', data: undefined})  
                }
            })

        }else{
            res.status(500).send({message: 'No Acceso'})  
        }
    }else{
        res.status(500).send({message: 'No Acceso'})  
    }
}

const obtener_cliente_admin = async function (req, res) { 

    if (req.user) {
        if (req.user.rol === 'admin') {

            var id = req.params['id'];

            try {

                var req = await Cliente.findById({_id: id})

                res.status(200).send({data: req})

            } catch (error) {
                res.status(200).send({data: undefined})
            }

        }else{
            res.status(500).send({message: 'No Acceso'})  
        }
    }else{
        res.status(500).send({message: 'No Acceso'})  
    }

 }

 const obtener_cliente_guest = async function (req, res) { 

    if (req.user) {

        var id = req.params['id'];

        try {

            var req = await Cliente.findById({_id: id})

            res.status(200).send({data: req})

        } catch (error) {
                res.status(200).send({data: undefined})
        }
    }else{
        res.status(500).send({message: 'No Acceso'})  
    }

 }

const actualizar_cliente_admin = async function (req, res) { 

    if (req.user) {
        if (req.user.rol === 'admin') {

            var id = req.params['id'];
            var data = req.body;

           var req = await Cliente.findByIdAndUpdate({_id: id}, {
               nombres: data.nombres,
               apellidos: data.apellidos,
               email: data.email,
               telefono: data.telefono,
               f_nacimiento: data.f_nacimiento,
               dni: data.dni,
               genero: data.genero
           })

           res.status(200).send({data: req})

        }else{
            res.status(500).send({message: 'No Acceso'})  
        }
    }else{
        res.status(500).send({message: 'No Acceso'})  
    }


 }

const eliminar_cliente_admin = async function (req, res) { 

    if (req.user) {
        if (req.user.rol === 'admin') {

            var id = req.params['id'];

            let reg = await Cliente.findByIdAndRemove({_id: id});

            res.status(200).send({data: reg})

        }else{
            res.status(500).send({message: 'No Acceso'})  
        }
    }else{
        res.status(500).send({message: 'No Acceso'})  
    }

 }


const actualizar_perfil_cliente_guest = async function (req, res) { 

    if (req.user) {

        var id = req.params['id'];

        var data = req.body;

        if (data.password) {
            
            //encryptar contraseña
            bcryct.hash(data.password, null,null, async function (err, hash) { 
                var reg = await Cliente.findByIdAndUpdate({_id:id},{
                    nombres: data.nombres,
                    apellidos: data.apellidos,
                    telefono: data.telefono,
                    f_nacimiento: data.f_nacimiento,
                    dni: data.dni,
                    genero: data.genero,
                    pais: data.pais,
                    password: hash
                });
                

                res.status(200).send({data: reg})  
            });

        }else{
   
            var reg = await Cliente.findByIdAndUpdate({_id:id},{
                nombres: data.nombres,
                apellidos: data.apellidos,
                telefono: data.telefono,
                f_nacimiento: data.f_nacimiento,
                dni: data.dni,
                genero: data.genero,
                pais: data.pais
            });

            res.status(200).send({data: reg})  
        }


    }else{
        res.status(500).send({message: 'No Acceso'})  
    }
}


module.exports = {
    registro_cliente,
    login_cliente,
    listar_clientes_filtro_admin,
    registro_cliente_admin,
    obtener_cliente_admin,
    actualizar_cliente_admin,
    eliminar_cliente_admin,
    obtener_cliente_guest,
    actualizar_perfil_cliente_guest
}