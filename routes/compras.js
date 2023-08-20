const {Router} = require('express');

const pool = require('../database');

const router = Router();

router.get('/', async(req, res)=>{
    let compras = await pool.query('Select V.id, sum(Cantidad) as CantidadTotal, sum(precio) as PrecioTotal, fecha from Venta as V inner join DetalleVenta as DV on V.id = DV.id_venta inner join Mueble as M on DV.id_mueble = M.id where id_usuario = ? group by V.id, Fecha;', [req.user.usuario]);
    res.render('compras/verCompras', {'compras': compras});
})

router.get('/:id/detalle', async(req, res) => {
    let {id} = req.params;
    let detalles = await pool.query('select id_mueble as id, cantidad, tipo, categoria, precio from DetalleVenta as DV inner join Mueble as M on DV.id_mueble = M.id where id_venta= ?;',[id]);
    res.json(detalles);
});

module.exports = router;