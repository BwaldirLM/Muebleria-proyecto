const {Router} = require('express');
const multer = require('multer');

const pool = require('../database');

const {isLogged, isNotLogged, isAdmin} = require('../util/auth')

const router = Router();

// Configuración de Multer para la carga de imágenes
const storage = multer.memoryStorage(); // Almacenar la imagen en memoria
const upload = multer({ storage: storage });

router.get('/', isLogged, async(req, res)=>{
    let muebles = await pool.query('select * from mueble');
    for(let mueble of muebles){
        mueble.imagen = mueble.imagen.toString('base64');
    }
   
    let cantidadTotal = 0;
    let infoCarrito = await pool.query('select tipo, cantidad from Carrito as C inner join itemCarrito as IC on C.id = IC.id_carrito inner join Mueble as M on IC.id_mueble = M.id where estado = ? and id_usuario = ?', ['libre', req.user.usuario])
    if(infoCarrito.length > 0){
        for(let item of infoCarrito){
            cantidadTotal += item.cantidad;
        }   
    }
    res.render('mueble/mueblesTotal', {"muebles": muebles, "carrito": infoCarrito, 'cantidad': cantidadTotal});
});

router.get('/salas', isLogged, async(req, res)=>{
    let muebles = await pool.query('SELECT * FROM Mueble where categoria = ?',['Sala']);
    for(let mueble of muebles){
        mueble.imagen = mueble.imagen.toString('base64');
    }
   
    let cantidadTotal = 0;
    let infoCarrito = await pool.query('select tipo, cantidad from Carrito as C inner join itemCarrito as IC on C.id = IC.id_carrito inner join Mueble as M on IC.id_mueble = M.id where estado = ? and id_usuario = ?', ['libre', req.user.usuario])
    if(infoCarrito.length > 0){
        for(let item of infoCarrito){
            cantidadTotal += item.cantidad;
        }   
    }
    res.render('mueble/mueblesSala', {"muebles": muebles, "carrito": infoCarrito, 'cantidad': cantidadTotal});
});
router.get('/dormitorios', isLogged, async(req, res)=>{
    let muebles = await pool.query('SELECT * FROM Mueble where categoria = ?',['Dormitorio']);
    for(let mueble of muebles){
        mueble.imagen = mueble.imagen.toString('base64');
    }
   
    let cantidadTotal = 0;
    let infoCarrito = await pool.query('select tipo, cantidad from Carrito as C inner join itemCarrito as IC on C.id = IC.id_carrito inner join Mueble as M on IC.id_mueble = M.id where estado = ? and id_usuario = ?', ['libre', req.user.usuario])
    if(infoCarrito.length > 0){
        for(let item of infoCarrito){
            cantidadTotal += item.cantidad;
        }   
    }
    res.render('mueble/mueblesDormitorio', {"muebles": muebles, "carrito": infoCarrito, 'cantidad': cantidadTotal});
});
router.get('/comedores', isLogged, async(req, res)=>{
    let muebles = await pool.query('SELECT * FROM Mueble where categoria = ?',['Comedor']);
    for(let mueble of muebles){
        mueble.imagen = mueble.imagen.toString('base64');
    }
   
    let cantidadTotal = 0;
    let infoCarrito = await pool.query('select tipo, cantidad from Carrito as C inner join itemCarrito as IC on C.id = IC.id_carrito inner join Mueble as M on IC.id_mueble = M.id where estado = ? and id_usuario = ?', ['libre', req.user.usuario])
    if(infoCarrito.length > 0){
        for(let item of infoCarrito){
            cantidadTotal += item.cantidad;
        }   
    }
    res.render('mueble/mueblesComedor', {"muebles": muebles, "carrito": infoCarrito, 'cantidad': cantidadTotal});
});

router.get('/dormitorios', isLogged, async(req, res)=>{
    let muebles = await pool.query('SELECT * FROM Mueble where categoria = ?',['Dormitorio']);
    for(let mueble of muebles){
        mueble.imagen = mueble.imagen.toString('base64');
    }
   
    let cantidadTotal = 0;
    let infoCarrito = await pool.query('select tipo, cantidad from Carrito as C inner join itemCarrito as IC on C.id = IC.id_carrito inner join Mueble as M on IC.id_mueble = M.id where estado = ? and id_usuario = ?', ['libre', req.user.usuario])
    if(infoCarrito.length > 0){
        for(let item of infoCarrito){
            cantidadTotal += item.cantidad;
        }   
    }
    res.render('mueble/mueblesDormitorio', {"muebles": muebles, "carrito": infoCarrito, 'cantidad': cantidadTotal});
});

router.get('/escritorios', isLogged, async(req, res)=>{
    let muebles = await pool.query('SELECT * FROM Mueble where categoria = ?',['Escritorio']);
    for(let mueble of muebles){
        mueble.imagen = mueble.imagen.toString('base64');
    }
   
    let cantidadTotal = 0;
    let infoCarrito = await pool.query('select tipo, cantidad from Carrito as C inner join itemCarrito as IC on C.id = IC.id_carrito inner join Mueble as M on IC.id_mueble = M.id where estado = ? and id_usuario = ?', ['libre', req.user.usuario])
    if(infoCarrito.length > 0){
        for(let item of infoCarrito){
            cantidadTotal += item.cantidad;
        }   
    }
    res.render('mueble/mueblesEscritorio', {"muebles": muebles, "carrito": infoCarrito, 'cantidad': cantidadTotal});
});

router.get('/detalle/:id', isLogged, async(req, res)=>{
    let {id} = req.params;
    let mueble = await pool.query('Select * from mueble where id = ?',[id]);
    mueble[0].imagen = mueble[0].imagen.toString('base64');
    res.render('mueble/muebleDetalle',{"mueble": mueble[0]});
});

router.post('/detalle/:id',isLogged, async(req, res)=>{
    const {mueble_id, cantidad} = req.body;
    let usuario_id = req.user.usuario;
    if(cantidad > 0){
        let carritoLibre = await pool.query('select * from Carrito where estado = ? and id_usuario = ?', ['libre', usuario_id])
        if(carritoLibre.length > 0){
            let {id} = carritoLibre[0];
            let item =await pool.query('SELECT * FROM ItemCarrito WHERE id_carrito = ? AND id_mueble = ?', [id, mueble_id]);
            if(item.length > 0){
                const cantidadActualizada = parseInt(item[0].cantidad) + parseInt(cantidad);
                await pool.query('UPDATE ItemCarrito SET cantidad = ? WHERE id_carrito = ? AND id_mueble = ?', [cantidadActualizada, id, mueble_id]);
            }
            else{
                await pool.query('insert into ItemCarrito (id_carrito, id_mueble, cantidad) VALUES (?, ?, ?)',[id, mueble_id, cantidad]);
            }               
        }
        else{
            let carrito = await pool.query('INSERT INTO Carrito (id_usuario) VALUES (?)', [usuario_id]);
            let id = carrito.insertId;
            await pool.query('insert into ItemCarrito (id_carrito, id_mueble, cantidad) VALUES (?, ?, ?)',[id, mueble_id, cantidad]);       

        }

    }
    
    res.redirect('/mueble')
});

router.get('/agregar',isAdmin, (req, res)=>{
    res.render('mueble/agregar')
})

router.post('/agregar',isAdmin, async(req,res)=>{
    try {
        upload.single('imagen')(req, res, async (err) => {
          if (err instanceof multer.MulterError) {
            return res.status(400).send('Error al subir la imagen');
          } else if (err) {
            return res.status(500).send('Error interno del servidor');
          }
    
          const imagenSubida = req.file; // Acceder al archivo subido
          if (!imagenSubida) {
            return res.status(400).send('No se ha proporcionado una imagen');
          }
    
          const imagenContenido = imagenSubida.buffer; // Obtener el contenido de la imagen en bytes
          
          let datos = req.body;
          datos.imagen = imagenContenido;
          datos.mimetype = imagenSubida.mimetype;
            await pool.query('INSERT INTO Mueble SET ?',[datos]);
          res.redirect('/mueble');
        });
      } catch (error) {
        console.error(error);
        res.status(500).send('Error al procesar la imagen');
      }
    //await pool.query('INSERT INTO Mueble SET ?',[req.body]);
    //res.redirect('/mueble');
});

router.get('/listar', isAdmin, async(req, res)=>{
    let muebles = await pool.query('select * from mueble');
    for(let mueble of muebles){
        mueble.imagen = mueble.imagen.toString('base64');
    }
    res.render('mueble/listar', {muebles: muebles});
});

router.post('/editar', isAdmin, async(req, res)=>{
    console.log('editar');
    console.log(req.body);
});

module.exports = router;