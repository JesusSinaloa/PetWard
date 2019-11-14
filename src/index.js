const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const fileUpload = require('express-fileupload');

//INITIALIZATIONS
const app = express();
require('./database');
require('./config/passport');
//SETTINGS
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs');
//MIDDLEWARES
app.use(express.urlencoded({extended: false}));
app.use(fileUpload());
app.use(methodOverride('_method'));
app.use(session({
  secret: 'mysecretapp',
  resave: true,
  saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//GLOBALS VARIABLES
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});
//ROUTER
app.use(require('./routes/routes_index'));
app.use(require('./routes/routes_parejas'));
app.use(require('./routes/routes_login'));
app.use(require('./routes/routes_dashboard'));
app.use(require('./routes/routes_vestimenta'));
app.use(require('./routes/routes_detail_pet'));
app.use(require('./routes/routes_donative'));
//STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));
//SERVER IS LISTENNING
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});
