const express =  require('express');
const path = require('path');
const {engine} = require('express-handlebars');
const dateFormat = require('handlebars-dateformat');
const session =require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const passport = require('passport')
const flash = require('express-flash');




require('dotenv').config();
require('./util/passport');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(__dirname + '/uploads'));


app.engine('.hbs', engine({
    defaultLayout:'main',
    layoutsDir:path.join(app.get('views'), 'layouts'),
    partialsDir:path.join(app.get('views'), 'partials'),
    extname:'.hbs',
    helpers:require('./util/handlebars')
 }));
app.set('view engine', 'hbs');


app.use(session({
    secret:'session',
    resave:false,
    saveUninitialized: false,

    store: new MySQLStore({
       host: process.env.HOST,
       user: 'root',
       password: process.env.MYSQL_PASSWORD,
       puerto: process.env.PORT,
       database: process.env.MYSQL_DATABASE
    })
 }))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended:false}));
app.use(express.json())

//Global variables
app.use((req, res, next)=>{
    app.locals.user = req.user 
    next();
 });



//importar rutas
const muebleRouter = require('./routes/mueble');
const carritoRouter = require('./routes/carrito');
const authRouter = require('./routes/auth');
const indexRouter = require('./routes/index');
const comprasRouter = require('./routes/compras');

//Rutas
app.use('/mueble', muebleRouter);
app.use('/carrito', carritoRouter);
app.use('/', authRouter);
app.use('/index', indexRouter);
app.use('/compras', comprasRouter);

app.listen(process.env.PORT, ()=>{
    console.log("Servir corriendo");
});


