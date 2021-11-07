const express = require("express");
const path = require('path');
const handle = require('express-handlebars');
const method0verride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
require('dotenv').config();

// Inicializaciones
const app = express();
require('./database');
require('./config/passport');

// Settings


app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', handle({
    defaultLayout: 'main', 
    LayoutsDir: path.join(app.get('views'), 'Layouts'),
    partialsDir: path.join(app.get('views'), 'partials'), 
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(method0verride('_method'));
app.use(session({
    secret: 'pollo',
    resave: true,
    saveUnitialized: true
})) 

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global Variables
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    res.locals.error_msg = req.flash('error_msg');
    res.locals.sucess_msg = req.flash('sucess_msg');
    res.locals.error = req.flash('error');
    next();
});

// Routes
app.use(require('./routes/index'));
app.use(require('./routes/citas'));
app.use(require('./routes/users'));

// Static Files

app.use(express.static(path.join(__dirname, 'public')));

// iniciar servidor

app.listen(app.get('port'), () =>{
    console.log('servidor ejecutandose', app.get('port'));
})