const {Router} = require('express');

const pool = require('../database');



const router = Router();

router.get('/', async(req, res)=>{
    let muebles = await pool.query('select * from mueble');
    let infoCarrito = [];
    let cantidadTotal = 0;

    let carritoLibre = await pool.query('select * from Carrito where estado = ?', ['libre'])
    if(carritoLibre.length > 0){
        
        let carritoId = carritoLibre[0].id;
        let muebles = await pool.query('SELECT * FROM ItemCarrito WHERE id_carrito = ?', [carritoId]);
        for (const mueble of muebles) {
            // Accede a las propiedades del mueble dentro del bucle
            let infoaux = {};
            infoaux.cantidad = mueble.cantidad;
            cantidadTotal += mueble.cantidad;
            let tipo = await pool.query('select tipo FROM MUEBLE WHERE id = ?',[mueble.id_mueble]);
            infoaux.tipo = tipo[0].tipo;
            infoCarrito.push(infoaux)
        }  
    }
    res.render('mueble/mueblesTotal', {"muebles": muebles, "carrito": infoCarrito, 'cantidad': cantidadTotal});
});

router.get('/salas', async(req, res)=>{
    let muebles = await pool.query('SELECT * FROM Mueble where categoria = ?',['Sala']);
    let infoCarrito = [];
    let cantidadTotal = 0;

    let carritoLibre = await pool.query('select * from Carrito where estado = ?', ['libre'])
    if(carritoLibre.length > 0){
        
        let carritoId = carritoLibre[0].id;
        let muebles = await pool.query('SELECT * FROM ItemCarrito WHERE id_carrito = ?', [carritoId]);
        for (const mueble of muebles) {
            // Accede a las propiedades del mueble dentro del bucle
            let infoaux = {};
            infoaux.cantidad = mueble.cantidad;
            cantidadTotal += mueble.cantidad;
            let tipo = await pool.query('select tipo FROM MUEBLE WHERE id = ?',[mueble.id_mueble]);
            infoaux.tipo = tipo[0].tipo;
            infoCarrito.push(infoaux)
        }  
    }
    res.render('mueble/mueblesSala', {"muebles": muebles, "carrito": infoCarrito, 'cantidad': cantidadTotal});
});
router.get('/dormitorios', async(req, res)=>{
    let muebles = await pool.query('SELECT * FROM Mueble where categoria = ?',['Dormitorio']);
    let infoCarrito = [];
    let cantidadTotal = 0;

    let carritoLibre = await pool.query('select * from Carrito where estado = ?', ['libre'])
    if(carritoLibre.length > 0){
        
        let carritoId = carritoLibre[0].id;
        let muebles = await pool.query('SELECT * FROM ItemCarrito WHERE id_carrito = ?', [carritoId]);
        for (const mueble of muebles) {
            // Accede a las propiedades del mueble dentro del bucle
            let infoaux = {};
            infoaux.cantidad = mueble.cantidad;
            cantidadTotal += mueble.cantidad;
            let tipo = await pool.query('select tipo FROM MUEBLE WHERE id = ?',[mueble.id_mueble]);
            infoaux.tipo = tipo[0].tipo;
            infoCarrito.push(infoaux)
        }  
    }
    res.render('mueble/mueblesDormitorio', {"muebles": muebles, "carrito": infoCarrito, 'cantidad': cantidadTotal});
});
router.get('/comedores', async(req, res)=>{
    let muebles = await pool.query('SELECT * FROM Mueble where categoria = ?',['Comedor']);
    let infoCarrito = [];
    let cantidadTotal = 0;

    let carritoLibre = await pool.query('select * from Carrito where estado = ?', ['libre'])
    if(carritoLibre.length > 0){
        
        let carritoId = carritoLibre[0].id;
        let muebles = await pool.query('SELECT * FROM ItemCarrito WHERE id_carrito = ?', [carritoId]);
        for (const mueble of muebles) {
            // Accede a las propiedades del mueble dentro del bucle
            let infoaux = {};
            infoaux.cantidad = mueble.cantidad;
            cantidadTotal += mueble.cantidad;
            let tipo = await pool.query('select tipo FROM MUEBLE WHERE id = ?',[mueble.id_mueble]);
            infoaux.tipo = tipo[0].tipo;
            infoCarrito.push(infoaux)
        }  
    }
    res.render('mueble/mueblesComedor', {"muebles": muebles, "carrito": infoCarrito, 'cantidad': cantidadTotal});
});

router.get('/dormitorios', async(req, res)=>{
    let muebles = await pool.query('SELECT * FROM Mueble where categoria = ?',['Dormitorio']);
    
    let infoCarrito = [];
    let cantidadTotal = 0;

    let carritoLibre = await pool.query('select * from Carrito where estado = ?', ['libre'])
    if(carritoLibre.length > 0){
        
        let carritoId = carritoLibre[0].id;
        let muebles = await pool.query('SELECT * FROM ItemCarrito WHERE id_carrito = ?', [carritoId]);
        for (const mueble of muebles) {
            // Accede a las propiedades del mueble dentro del bucle
            let infoaux = {};
            infoaux.cantidad = mueble.cantidad;
            cantidadTotal += mueble.cantidad;
            let tipo = await pool.query('select tipo FROM MUEBLE WHERE id = ?',[mueble.id_mueble]);
            infoaux.tipo = tipo[0].tipo;
            infoCarrito.push(infoaux)
        }  
    }
    res.render('mueble/mueblesDormitorio', {"muebles": muebles, "carrito": infoCarrito, 'cantidad': cantidadTotal});
});

router.get('/escritorios', async(req, res)=>{
    let muebles = await pool.query('SELECT * FROM Mueble where categoria = ?',['Escritorio']);
    
    let infoCarrito = [];
    let cantidadTotal = 0;

    let carritoLibre = await pool.query('select * from Carrito where estado = ?', ['libre'])
    if(carritoLibre.length > 0){
        
        let carritoId = carritoLibre[0].id;
        let muebles = await pool.query('SELECT * FROM ItemCarrito WHERE id_carrito = ?', [carritoId]);
        for (const mueble of muebles) {
            // Accede a las propiedades del mueble dentro del bucle
            let infoaux = {};
            infoaux.cantidad = mueble.cantidad;
            cantidadTotal += mueble.cantidad;
            let tipo = await pool.query('select tipo FROM MUEBLE WHERE id = ?',[mueble.id_mueble]);
            infoaux.tipo = tipo[0].tipo;
            infoCarrito.push(infoaux)
        }  
    }
    res.render('mueble/mueblesEscritorio', {"muebles": muebles, "carrito": infoCarrito, 'cantidad': cantidadTotal});
});

router.get('/detalle/:id', async(req, res)=>{
    let {id} = req.params;
    let mueble = await pool.query('Select * from mueble where id = ?',[id]);
    res.render('mueble/muebleDetalle',{"mueble": mueble[0]});
});

router.post('/detalle/:id', async(req, res)=>{
    const {usuario_id, mueble_id, cantidad} = req.body;
    let carritoLibre = await pool.query('select * from Carrito where estado = ?', ['libre'])
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

    res.redirect('/mueble')
});

router.get('/agregar', (req, res)=>{
    res.render('mueble/agregar')
})
router.post('/agregar', async(req,res)=>{
    await pool.query('INSERT INTO Mueble SET ?',[req.body]);
    res.redirect('/mueble');
});

module.exports = router;