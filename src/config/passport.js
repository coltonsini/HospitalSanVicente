const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy

const Usuario = require('../models/User');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, pass, done) => {
    const user = await Usuario.findOne ({email: email});
    if(!user) {
        return done(null, false, { message: 'Usuario no encontrado'});
    } else {
        const match = await user.matchPassword(pass);
        if(match){
            return done(null, user);
        } else {
            return done(null, false, {message: 'Contraseña incorrecta'});
        }
    }
}));

passport.serializeUser((Usuario, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    user.findById(id, (err, user) => {
        done(err, user);
    })
})