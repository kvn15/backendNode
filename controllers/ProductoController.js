'use strict'

var Producto = require('../models/producto');
var Inventario = require('../models/inventario');
//manejador de archivos
var filesystem = require('fs')
var path = require('path')

const registro_producto_admin = async function (req, resp) { 

    if (req.user) {
        if (req.user.rol = 'admin') {
            let data = req.body;
            //obtener image
            // console.log(data);
            // console.log(req.files);
            var img_path = req.files.portada.path;
            var name = img_path.split('\\');
            var portada_name = name[2];

            data.portada = portada_name;
            //convierte titulo en slug(url)
            data.slug = data.titulo.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'')
            let reg = await Producto.create(data);

            let inventario = await Inventario.create({
                //sub: se crea en el helper
                admin: req.user.sub,
                cantidad: data.stock,
                proveedor: 'Primer Registro',
                producto: reg._id
            })

            resp.status(200).send({data: reg, inventario: inventario})

        }else{
            resp.status(500).send({message: 'No Acceso'})
        }
    }else{
        resp.status(500).send({message: 'No Acceso'})  
    }

}

const listar_producto_admin = async function (req, resp) { 

    if (req.user) {
        if (req.user.rol = 'admin') {

            var filtro = req.params['filtro'];

            let reg = await Producto.find({titulo: new RegExp(filtro, 'i')})

            resp.status(200).send({data: reg})

        }else{
            resp.status(500).send({message: 'No Acceso'})
        }
    }else{
        resp.status(500).send({message: 'No Acceso'})  
    }
 }

 const obtener_portada = async function (req, resp) { 
     //obtener nombre de la imagen
    var img = req.params['img'];

    filesystem.stat('./uploads/productos/'+img, function (err) { 
        if (!err) {
            //mandar imagen
            let path_img = './uploads/productos/'+img;
            resp.status(200).sendFile(path.resolve(path_img))
        }else{
            let path_img = './uploads/default.jpg';
            resp.status(200).sendFile(path.resolve(path_img))  
        }
     })
 }

 const obtener_producto_admin = async function (req, res) { 

    if (req.user) {
        if (req.user.rol === 'admin') {

            var id = req.params['id'];

            try {

                var req = await Producto.findById({_id: id})

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


 const actualizar_producto_admin = async function (req, resp) { 

    if (req.user) {
        if (req.user.rol = 'admin') {
            let id = req.params['id'];
            let data = req.body;
            
            if (req.files) {
                //si hay imagen
                var img_path = req.files.portada.path;
                var name = img_path.split('\\');
                var portada_name = name[2];

                let reg = await Producto.findByIdAndUpdate({_id: id}, {
                    titulo: data.titulo,
                    stock: data.stock,
                    slug : data.titulo.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,''),
                    precio: data.precio,
                    categoria: data.categoria,
                    descripcion: data.descripcion,
                    contenido: data.contenido,
                    portada: portada_name
                })

                filesystem.stat('./uploads/productos/'+reg.portada, function (err) { 
                    if (!err) {
                        filesystem.unlink('./uploads/productos/'+reg.portada, (err) => {
                            if (err) throw err;
                        })
                    }
                 })

                resp.status(200).send({data: reg})

            }else{
                //no hay imagen
                let reg = await Producto.findByIdAndUpdate({_id: id}, {
                    titulo: data.titulo,
                    stock: data.stock,
                    slug : data.titulo.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,''),
                    precio: data.precio,
                    categoria: data.categoria,
                    descripcion: data.descripcion,
                    contenido: data.contenido
                })
                resp.status(200).send({data: reg})
            }

        }else{
            resp.status(500).send({message: 'No Acceso'})
        }
    }else{
        resp.status(500).send({message: 'No Acceso'})  
    }

}


const eliminar_producto_admin = async function (req, res) { 

    if (req.user) {
        if (req.user.rol === 'admin') {

            var id = req.params['id'];

            let reg = await Producto.findByIdAndRemove({_id: id});

            filesystem.stat('./uploads/productos/'+reg.portada, function (err) { 
                if (!err) {
                    filesystem.unlink('./uploads/productos/'+reg.portada, (err) => {
                        if (err) throw err;
                    })
                }
             })

            res.status(200).send({data: reg})

        }else{
            res.status(500).send({message: 'No Acceso'})  
        }
    }else{
        res.status(500).send({message: 'No Acceso'})  
    }

 }

const listar_inventario_producto_admin = async function (req, resp) { 
    if (req.user) {
        if (req.user.rol === 'admin') {

            var id = req.params['id'];

            //busca por id producto
            //populate es como el Inner Join
            //sort metodo para ordenar
            var reg = await Inventario.find({producto: id}).populate('admin').sort({createdaT: -1});

            resp.status(200).send({data: reg});

        }else{
            resp.status(500).send({message: 'No Acceso'})  
        }
    }else{
        resp.status(500).send({message: 'No Acceso'})  
    }
}

const eliminar_inventario_producto_admin = async function (req, resp) { 
    if (req.user) {
        if (req.user.rol === 'admin') {

            //Obtener id del inventario
            var id = req.params['id'];
            //Eliminando el Inventario
            let reg = await Inventario.findByIdAndRemove({_id: id});
            //obtener el registro del producto
            let prod = await Producto.findById({_id: reg.producto})
            //calcular nuevo Stock
            let nuevoStock = parseInt(prod.stock) - parseInt(reg.cantidad);
            //Actualizacion del nuevo stock al producto
            let producto = await Producto.findByIdAndUpdate({_id: reg.producto},{
                stock: nuevoStock
            })

            resp.status(200).send({data: producto})

        }else{
            resp.status(500).send({message: 'No Acceso'})  
        }
    }else{
        resp.status(500).send({message: 'No Acceso'})  
    }
}

const registro_inventario_producto_admin = async function (req, resp) { 

    if (req.user) {
        if (req.user.rol === 'admin') {

            let data = req.body;

            let reg = await Inventario.create(data);
            //OBTENER REGISTRO DEL PRODUCTO
            let prod = await Producto.findById({_id: reg.producto})
            //CALCULAR NUEVO STOCK
                             //STOCK ACTUAL         //STOCK A AUMENTAR
            let nuevoStock = parseInt(prod.stock) + parseInt(reg.cantidad);
            //ACTUALIZAR NUEVO STOCK
            let producto = await Producto.findByIdAndUpdate({_id: reg.producto},{
                stock: nuevoStock
            })

            resp.status(200).send({data: reg})

        }else{
            resp.status(500).send({message: 'No Acceso'})  
        }
    }else{
        resp.status(500).send({message: 'No Acceso'})  
    }

}

const actualizar_producto_variedades_admin = async function (req, resp) { 

    if (req.user) {
        if (req.user.rol = 'admin') {
            let id = req.params['id'];
            let data = req.body;
            
            let reg = await Producto.findByIdAndUpdate({_id: id}, {
                titulo_variedad: data.titulo_variedad,
                variedades: data.variedades
            })
            resp.status(200).send({data: reg})

        }else{
            resp.status(500).send({message: 'No Acceso'})
        }
    }else{
        resp.status(500).send({message: 'No Acceso'})  
    }

}

const agregar_imagen_galeria_admin = async function (req, resp) { 

    if (req.user) {
        if (req.user.rol = 'admin') {
            let id = req.params['id'];
            let data = req.body;
           
            var img_path = req.files.imagen.path;
            var name = img_path.split('\\');
            var imagen_name = name[2];

            let reg = await Producto.findByIdAndUpdate({_id: id}, {
                //metodo para agregar un elemento al array
                $push: {
                    galeria: {
                        imagen: imagen_name,
                        _id: data._id
                    }
                }
            });

            resp.status(200).send({data: reg})

        }else{
            resp.status(500).send({message: 'No Acceso'})
        }
    }else{
        resp.status(500).send({message: 'No Acceso'})  
    }

}

const eliminar_imagen_galeria_admin = async function (req, resp) { 

    if (req.user) {
        if (req.user.rol = 'admin') {
            let id = req.params['id'];
            let data = req.body;
           

            let reg = await Producto.findByIdAndUpdate({_id: id}, {
                //meotodo para poder eliminar
                $pull: {
                    galeria:{
                        _id: data._id
                    }              
                }
            });

            resp.status(200).send({data: reg})

        }else{
            resp.status(500).send({message: 'No Acceso'})
        }
    }else{
        resp.status(500).send({message: 'No Acceso'})  
    }

}


//----METODOS PUBLICOS.-------------

const listar_producto_publico = async function (req, resp) { 

    var filtro = req.params['filtro'];

    let reg = await Producto.find({titulo: new RegExp(filtro, 'i')}).sort({createdaT: -1})

    resp.status(200).send({data: reg})

}

const obtener_producto_publico_slug = async function (req, resp) { 

    var slug = req.params['slug'];

    let reg = await Producto.findOne({slug: slug})

    resp.status(200).send({data: reg})

}

const listar_producto_recomendado_publico = async function (req, resp) { 

    var categoria = req.params['categoria'];

    let reg = await Producto.find({categoria: categoria}).sort({createdaT: -1}).limit(8)

    resp.status(200).send({data: reg})

}

 module.exports = {
     registro_producto_admin,
     listar_producto_admin,
     obtener_portada,
     obtener_producto_admin,
     actualizar_producto_admin,
     eliminar_producto_admin,
     listar_inventario_producto_admin,
     eliminar_inventario_producto_admin,
     registro_inventario_producto_admin,
     actualizar_producto_variedades_admin,
     agregar_imagen_galeria_admin,
     eliminar_imagen_galeria_admin,
     listar_producto_publico,
     obtener_producto_publico_slug,
     listar_producto_recomendado_publico
 }