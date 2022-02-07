var Carrito = require('../models/carrito')

const agregar_carrito_cliente = async function (req, resp) { 

    if (req.user) {
        //guardamos la data
        let data = req.body;

        //validar si el cliente agrega el mismo producto
        let carrito_cliente = await Carrito.find({cliente: data.cliente, producto: data.producto})

        if (carrito_cliente.length == 0) {
            //Agregar a la coleccion
            let reg = await Carrito.create(data);
            //devolver el registro
            resp.status(200).send({data: reg})
        }else if (carrito_cliente.length >= 1) {
            resp.status(200).send({data: undefined})
        }



    }else{
        resp.status(500).send({message: 'No Acceso'})  
    }

}

module.exports = {
    agregar_carrito_cliente
}