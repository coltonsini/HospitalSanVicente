const express = require('express');
const router = express.Router();

const Usuario = require('../models/User');

const passport = require('passport');

router.get('/users/signin', (req, res) =>{
    res.render('users/singin');
});

router.post('/users/signin', passport.authenticate('local',  {
    successRedirect: '/citas',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.get('/users/signup', (req, res) =>{
    res.render('users/singup');
});

router.post('/users/signup', async (req, res) => {
    const {nombre, email, password, pass} = req.body;
    const errors = [];
    if(nombre.lenght <= 0) {
        errors.push({text: 'Porfavor ingresa tu nombre'})
    }
    if(pass.lenght <= 0) {
        errors.push({text: 'Porfavor ingresa tu contraseña'})
    }
    if(password.lenght <= 0) {
        errors.push({text: 'Porfavor ingresa la confirmación de tu contraseña'})
    }
    if(email.lenght <= 0) {
        errors.push({text: 'Porfavor ingresa tu correo'})
    }
    if (pass != password){
        errors.push({text: 'La contraseña no coincide'})
    }
    if (pass.lenght < 4) {
        errors.push({text: 'La contraseña debe tener al menos 4 caracteres'})
    }
    if (errors.lenght > 0){
        res.render('users/signup', {errors, nombre, email, pass, password});
    } else{
        const correoUsuario =  Usuario.findOne({email: email});
        if(correoUsuario){
            req.flash('error_msg', 'El correo ingresado ya esta en uso');
            res.redirect('/users/signup');
        }
       const NewUsuario = await new Usuario({nombre, correo, pass});
       NewUsuario.pass = await NewUsuario.encryptPassword(pass)
       await NewUsuario.save()    
       req.flash('sucesss_msg', 'Estas registrado');
       res.redirect('/users/signin');
    }

});


router.get('/users/logout'), (req, res) => {
    req.logout();
    res.redirect('/');
}
module.exports = router;