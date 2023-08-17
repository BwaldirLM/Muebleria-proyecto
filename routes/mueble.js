const {Router} = require('express');
const client = require('../database')

const carrito = require('../util/carrito');



const router = Router();

router.get('/', async(req, res)=>{
    let muebles = await client.query('SELECT * FROM Mueble');
    console.log(muebles.rows);
    res.render('mueble/mueblesTotal', {"muebles": muebles.rows});
});

router.get('/salas', async(req, res)=>{
    let muebles = await client.query('SELECT * FROM Mueble where categoria = $1',['Sala']);
    res.render('mueble/mueblesSala', {"muebles": muebles.rows});
});
router.get('/dormitorios', async(req, res)=>{
    let muebles = await client.query('SELECT * FROM Mueble where categoria = $1',['Dormitorio']);
    res.render('mueble/mueblesDormitorio', {"muebles": muebles.rows});
});
router.get('/dormitorios', async(req, res)=>{
    let muebles = await client.query('SELECT * FROM Mueble where categoria = $1',['Comedor']);
    res.render('mueble/mueblesComedor', {"muebles": muebles.rows});
});
router.get('/dormitorios', async(req, res)=>{
    let muebles = await client.query('SELECT * FROM Mueble where categoria = $1',['Escritorio']);
    res.render('mueble/mueblesEscritorio', {"muebles": muebles.rows});
});

router.get('/detalle/:id', async(req, res)=>{
    let {id} = req.params;
    let detalle = await client.query('Select * from mueble where id = $1',[id]);
    res.render('mueble/muebleDetalle',{"mueble": detalle.rows[0]});
});
router.get('/agregar', (req, res)=>{
    res.render('mueble/agregar')
})
router.post('/agregar', async(req,res)=>{
    console.log(req.body);
    const {tipo, categoria, descripcion, precio, material, altura, ancho, largo, imagen} = req.body;
    await client.query('INSERT INTO Mueble (tipo, categoria, descripcion, precio, material, altura, ancho, largo, imagen) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
    [tipo, categoria, descripcion, precio, material, altura, ancho, largo, imagen]);
    res.redirect('/mueble');
});

module.exports = router;