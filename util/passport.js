const passport = require('passport')
const localStrategy = require('passport-local').Strategy

const pool = require('../database')


const helpers = require('./helpers');

passport.use('local.login', new localStrategy({
    usernameField: 'usuario',
    passwordField: 'contraseña',
    passReqToCallback: true
}, async (req, usuario, contraseña, done) => {
    try {
        let consulta = await pool.query('SELECT * FROM Usuario WHERE usuario = ?', [usuario]);
        if (consulta.length > 0) {
            let user = consulta[0];
            let validPassword = await helpers.matchPassword(contraseña, user.contrasena);
            if (validPassword) {
                // Autenticación exitosa
                return done(null, user);  // No es necesario el tercer argumento
            } else {
                // Contraseña incorrecta
                return done(null, false, { message: 'Contraseña Incorrecta' });
            }
        } else {
            // Usuario no existe
            return done(null, false, { message: 'El usuario no existe' });
        }
    } catch (error) {
        return done(error);
    }
}));




passport.use('local.signup', new localStrategy({
   usernameField: 'usuario',
   passwordField: 'contrasena',
   passReqToCallback: true
}, async(req, usuario, contrasena, done)=>{
   let {nombres, apellidos, email} = req.body
   const newUser = {
      usuario,
      contrasena
   }

   newUser.contrasena = await helpers.encryptPassword(contrasena);
   newUser.nombres = nombres;
   newUser.apellidos = apellidos
   newUser.email = email;
   newUser.Rol = 'cliente';
   const result = await pool.query('INSERT INTO Usuario SET ?', [newUser])
   
   
   return done(null, newUser)
}));

passport.serializeUser((usr, done)=>{
   done(null, usr.usuario)
})

passport.deserializeUser((async(id, done)=>{
   const rows = await pool.query('SELECT * FROM Usuario WHERE usuario = ?', [id])
   done(null, rows[0])
}))
