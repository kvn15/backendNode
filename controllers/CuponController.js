'use strict'

var Cupon = require('../models/cupon');

const registro_cupon_admin = async function (req, resp) { 

    if (req.user) {
        if (req.user.rol == 'admin') {
            
            let data = req.body;

            let reg = await Cupon.create(data);

            resp.status(200).send({data: reg});

        }else{
            resp.status(500).send({message: 'No Acceso'})
        }
    }else{
        resp.status(500).send({message: 'No Acceso'})  
    }

 }

 const listar_cupones_admin = async function (req, resp) { 

    if (req.user) {
        if (req.user.rol = 'admin') {

            var filtro = req.params['filtro'];

            let reg = await Cupon.find({codigo: new RegExp(filtro, 'i')}).sort({createdaT: -1})

            resp.status(200).send({data: reg})

        }else{
            resp.status(500).send({message: 'No Acceso'})
        }
    }else{
        resp.status(500).send({message: 'No Acceso'})  
    }
 }

const obtener_cupon_admin = async function (req, resp) { 

    if (req.user) {
        if (req.user.rol = 'admin') {

            var id = req.params['id'];

            try {
                let reg = await Cupon.findById({_id: id})

                resp.status(200).send({data: reg})
            } catch (error) {
                resp.status(200).send({data: undefined})
            }

        }else{
            resp.status(500).send({message: 'No Acceso'})
        }
    }else{
        resp.status(500).send({message: 'No Acceso'})  
    }

}

const update_cupon_admin = async function (req, resp) { 

    if (req.user) {
        if (req.user.rol = 'admin') {

            var id = req.params['id'];
            let data = req.body;

            let reg = await Cupon.findByIdAndUpdate({_id: id}, {
                codigo: data.codigo,
                tipo: data.tipo,
                valor: data.valor,
                limite: data.limite
            })

            resp.status(200).send({data: reg})

        }else{
            resp.status(500).send({message: 'No Acceso'})
        }
    }else{
        resp.status(500).send({message: 'No Acceso'})  
    }


}

const eliminar_cupon_admin = async function (req, resp) { 

    if (req.user) {
        if (req.user.rol = 'admin') {

            var id = req.params['id'];

            let reg = await Cupon.findByIdAndRemove({_id: id});

            resp.status(200).send({data: reg})

        }else{
            resp.status(500).send({message: 'No Acceso'})
        }
    }else{
        resp.status(500).send({message: 'No Acceso'})  
    }

}
 
module.exports = {
    registro_cupon_admin,
    listar_cupones_admin,
    obtener_cupon_admin,
    update_cupon_admin,
    eliminar_cupon_admin
}