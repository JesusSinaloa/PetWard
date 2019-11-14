const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

//VERIFICAR SI EL USUARIO EXISTE
passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) =>{
  const user = await User.findOne({email: email});
  if (!user) {
    return done(null, false, { message: 'Usuario no encontrado'});
  }else{
    const match = await user.matchPassword(password);
    if (match) {
      return done(null, user);
    }else{
      return done(null, false, { message: 'Password incorrecto'});
    }
  }
}));

//ESTABLECER UNA SESSION
passport.serializeUser((user, done) => {
  done(null, user.id);
})

//CERRAR SESSION
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
