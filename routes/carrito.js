const {Router} = require('express');
const pool = require('../database');

const {isLogged, isNotLogged} = require('../util/auth')



const router = Router();

router.get('/',isLogged,async(req, res)=>{
    let carritoLibre = await pool.query('select * from Carrito where estado = ? and id_usuario = ?', ['libre',req.user.usuario])
    let carrito = [];
    let totalPago = 0;
    if(carritoLibre.length > 0){
        let carritoId = carritoLibre[0].id;
        let muebles = await pool.query('SELECT * FROM ItemCarrito WHERE id_carrito = ?', [carritoId]);
        for (const mueble of muebles) {
            // Accede a las propiedades del mueble dentro del bucle
            let infoaux = {};
            infoaux.cantidad = mueble.cantidad;
            let muebleItem = await pool.query('select tipo, precio, imagen FROM MUEBLE WHERE id = ?',[mueble.id_mueble]);
            muebleItem[0].precioUnit = muebleItem[0].precio*mueble.cantidad;
            infoaux.mueble = muebleItem[0];
            carrito.push(infoaux);
            totalPago += muebleItem[0].precio*mueble.cantidad;
        }          
    }
    res.render('carrito/carrito', {'carrito':carrito, 'total': totalPago});
});

router.post('/', isLogged, async(req, res)=>{
    const consulta = `SELECT usuario, id_mueble, cantidad FROM usuario INNER JOIN carrito ON usuario.usuario = carrito.id_usuario  INNER JOIN itemCarrito ON carrito.id = itemCarrito.id_carrito    WHERE usuario.usuario= ? and carrito.estado = 'libre';`;
    let muebles = await pool.query(consulta, [req.user.usuario])
    let carrito = await pool.query('select id from Carrito where estado = ? and id_usuario = ?', ['libre',req.user.usuario])

    const fechaActual = new Date();
    const anio = fechaActual.getFullYear();
    const mes = String(fechaActual.getMonth() + 1).padStart(2, "0");
    const dia = String(fechaActual.getDate()).padStart(2, "0");
    const fechaFormateada = `${anio}-${mes}-${dia}`;
    let venta =  await pool.query(`INSERT INTO Venta(id_usuario, id_carrito, fecha) Values(?,'?',?)`,[req.user.usuario, carrito[0].id, fechaFormateada]);
    for (const m of muebles) {
        
        let {id_mueble, cantidad} = m;
        await pool.query('Insert into detalleVenta values(?,?,?)',[id_mueble, venta.insertId, cantidad]);
    }
    await pool.query(`update Carrito set estado = 'vendido' where id = ?`,[carrito[0].id]);
    res.redirect('/index')
});



module.exports = router;