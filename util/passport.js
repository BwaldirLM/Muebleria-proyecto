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
        let consulta = await pool.query('SELECT * FROM Usuario WHERE usuario = $1', [usuario]);
        if (consulta.rows.length > 0) {
            let user = consulta.rows[0];
            let validPassword = await helpers.matchPassword(contraseña, user.contraseña);
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
   usernameField: 'Cod_usuario',
   passwordField: 'Contrasena',
   passReqToCallback: true
}, async(req, Cod_usuario, Contrasena, done)=>{
   let {Rol} = req.body
   const newUser = {
      Cod_usuario,
      Contrasena
   }

   newUser.Contrasena = await helpers.encryptPassword(Contrasena);
   newUser.Rol = Rol
   const result = await pool.query('INSERT INTO Usuario SET ?', [newUser])
   newUser.id = result.insertId
   newUser.rol = 'Docente'
   return done(null, newUser)
}))

passport.serializeUser((usr, done)=>{
   done(null, usr.Cod_usuario)
})

passport.deserializeUser((async(id, done)=>{
   const rows = await pool.query('SELECT * FROM Usuario WHERE Cod_usuario = ?', [id])
   done(null, rows[0])
}))
