const {Router} = require('express');
const pool = require('../database');

const {isLogged, isNotLogged} = require('../util/auth')



const router = Router();

router.get('/',isLogged,async(req, res)=>{
    let carrito = await pool.query('select imagen, mimetype, cantidad, tipo, precio, cantidad*Precio as precio_total from Carrito as C inner join itemCarrito  as IC on C.id = IC.id_carrito inner join Mueble as M on IC.id_mueble = M.id where estado = ? and id_usuario = ?', ['libre',req.user.usuario]);
    let totalPago = 0;
    for(let item of carrito){
        item.imagen = item.imagen.toString('base64');
        totalPago += item.precio*item.cantidad;
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
        let stock = await pool.query('select stock from mueble where id = ?',[id_mueble]);
        let stockActualizado = stock[0].stock-cantidad;
        await pool.query('update Mueble set stock = ? where id = ?',[stockActualizado, id_mueble]);
    }
    await pool.query(`update Carrito set estado = 'vendido' where id = ?`,[carrito[0].id]);
    
    res.redirect('/index')
});



module.exports = router;