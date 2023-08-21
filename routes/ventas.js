const {Router} = require('express');
const { isAdmin } = require('../util/auth');
const pool = require('../database');

const router = Router();

router.get('/', isAdmin, async(req, res)=>{
    const ventas = await pool.query('Select * from Venta');
    res.render('ventas/ver', {ventas: ventas, admin: true});
});

router.get('/:id/detalle', async(req, res) => {
    let {id} = req.params;
    let detalles = await pool.query('select id_mueble as id, cantidad, tipo, categoria, precio, cantidad*precio as total from DetalleVenta as DV inner join Mueble as M on DV.id_mueble = M.id where id_venta= ?;',[id]);
    let comprador = await pool.query('select nombres, apellidos, email, sum(m.precio*dv.cantidad) as total from usuario as u inner join venta as v on u.usuario = v.id_usuario inner join detalleVenta as dv on v.id = dv.id_venta inner join mueble as m on dv.id_mueble = m.id where v.id = ? group by nombres, apellidos, email', [id]);
    informacion = {
        detalles,
        comprador
    }; 
    res.json(informacion);
});

module.exports = router;