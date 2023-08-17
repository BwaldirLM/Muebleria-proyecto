const {Router} = require("express");
const passport = require('passport')

const {isLogged, isNotLogged} = require('../util/auth')

const router = Router();

router.get('/admin', isNotLogged, (req, res)=>{
    res.render('auth/login', {layout: false});
});



router.post('/admin', (req, res, next)=>{
    passport.authenticate('local.login', {
        successRedirect: '/index',
        failureRedirect: '/mueble',
        failureFlash: true
     })(req, res, next) 
});

module.exports = router