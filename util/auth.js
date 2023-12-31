module.exports = {
   isLogged(req, res, next){
      if(req.isAuthenticated()){
         return next()
      }
      //req.flash('alerta', 'Primero inicie sesion')
      return res.redirect('/ingreso')
   },

   isNotLogged(req, res, next){
      if(!req.isAuthenticated()){
         return next()
      }
      return res.redirect('/ingreso')
   },

   isAdmin(req, res, next){
      if(req.isAuthenticated() && req.user.rol == 'administrador'){

         return next()
      }
      //req.flash('alerta', 'Primero inicie sesion')
      return res.redirect('/index')
   },
   
}