const {Router} = require('express');

const router = Router();

router.get('/',(req, res)=>{
    res.render('carrito/carrito');
});

module.exports = router;