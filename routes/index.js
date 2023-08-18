const {Router} = require('express');
const pool = require('../database');
const { isLogged } = require('../util/auth');

const router = Router();

router.get('/',isLogged, async(req, res)=>{
    
    res.render('index/index',{'user': req.user});
});

module.exports = router;