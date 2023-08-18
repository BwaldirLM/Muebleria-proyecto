const {Router} = require('express');
const pool = require('../database');



const router = Router();

router.get('/',async(req, res)=>{
    let carritoLibre = await pool.query('select * from Carrito where estado = ?', ['libre'])
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

module.exports = router;