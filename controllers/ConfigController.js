var Config = require('../models/config');
var filesystem = require('fs')
var path = require('path')

const actualizar_config_admin = async function (req,resp) { 

    if (req.user) {
        if (req.user.rol === 'admin') {

            let data = req.body;

            if (req.files) {
                var img_path = req.files.logo.path;
                var name = img_path.split('\\');
                var logo_name = name[2];

                let reg = await Config.findByIdAndUpdate({_id: "61f1831e158a4f120c288650"},{
                    categorias: JSON.parse(data.categorias),
                    titulo: data.titulo,
                    logo: logo_name,
                    serie: data.serie,
                    correlativo: data.correlativo
                });

                filesystem.stat('./uploads/configuraciones/'+reg.logo, function (err) { 
                    if (!err) {
                        filesystem.unlink('./uploads/configuraciones/'+reg.logo, (err) => {
                            if (err) throw err;
                        })
                    }
                 })
                 
                 resp.status(200).send({data: reg});
                
            }else{
                let reg = await Config.findByIdAndUpdate({_id: "61f1831e158a4f120c288650"},{
                    categorias: data.categorias,
                    titulo: data.titulo,
                    serie: data.serie,
                    correlativo: data.correlativo
                });

                resp.status(200).send({data: reg});
            }

        }else{
            resp.status(500).send({message: 'No Acceso'})  
        }
    }else{
        resp.status(500).send({message: 'No Acceso'})  
    }

}

const obtener_config_admin = async function (req,resp) { 
    if (req.user) {
        if (req.user.rol === 'admin') {

            let reg = await Config.findById({_id: "61f1831e158a4f120c288650"})

            resp.status(200).send({data: reg})

        }else{
            resp.status(500).send({message: 'No Acceso'})  
        }
    }else{
        resp.status(500).send({message: 'No Acceso'})  
    }
 }

 const obtener_logo = async function (req, resp) { 
    //obtener nombre de la imagen
   var img = req.params['img'];

   filesystem.stat('./uploads/configuraciones/'+img, function (err) { 
       if (!err) {
           //mandar imagen
           let path_img = './uploads/configuraciones/'+img;
           resp.status(200).sendFile(path.resolve(path_img))
       }else{
           let path_img = './uploads/default.jpg';
           resp.status(200).sendFile(path.resolve(path_img))  
       }
    })
}

const obtener_config_public = async function (req,resp) { 
    let reg = await Config.findById({_id: "61f1831e158a4f120c288650"})

    resp.status(200).send({data: reg})
}

module.exports = {
    actualizar_config_admin,
    obtener_config_admin,
    obtener_logo,
    obtener_config_public
}