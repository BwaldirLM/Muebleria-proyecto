const {Router} = require("express");
const passport = require('passport')

const {isLogged, isNotLogged} = require('../util/auth')

const router = Router();

router.get('/ingreso', isNotLogged, (req, res)=>{
    res.render('auth/login', {layout: false});
});



router.post('/ingreso', (req, res, next)=>{
    passport.authenticate('local.login', {
        successRedirect: '/index',
        failureRedirect: '/ingreso',
        failureFlash: true
     })(req, res, next) 
});

router.get('/registro', isNotLogged, (req, res)=>{
    res.render('auth/registro', {layout: false});
});

router.post('/registro',(req, res, next)=>{
    passport.authenticate('local.signup', {
       successRedirect: '/ingreso',
       failureRedirect: '/registro',
       failureFlash: true
    })(req, res, next)
 })

module.exports = router