const express = require('express');
const router = express.Router();

const Cita = require("../models/Citas");
const { isAuthenticated } = require('../helpers/auth');

router.get('/citas/crear', isAuthenticated, (req, res) => {
    res.render('citas/nueva-cita');
});

router.post('/citas/nueva-cita', isAuthenticated, async (req, res) =>{
    const { title, description } = req.body;
    const errors = [];
    if(!title){
        errors.push({text: 'Please Write a Title'});
    }
    if (!description){
        errors.push({text: 'Please Write a Description'});
    }
    if (errors.lenght>0) {
        res.render(citas/nueva-cita, {
            errors,
            title,
            description
        });
    } else {
        const newCita = new Cita({title, description });
        newCita.user = req.user.id;
        await newCita.save();
        req.flash('sucess_msg', 'Cita creada satisfactoriamente');
        res.redirect('/citas');
    }
    
});

router.get('/citas', isAuthenticated, async (req, res) => {
    const notes = await Cita.find({user: req.user.id}).sort({date: 'desc'});
    res.render('/citas/todas-citas', { citas });
});

router.get('/citas/edit/:id', async (req, res) => {
    const cita = await Cita.findById(req.params.id);
    res.render('citas/edit-note', {cita});
});

router.put('/citas/edit-cita/:id', async (req, res) => {
    const {title, description} = req.body;
    await Cita.findByIdAndUpdate(req.params.id, { title, description});
    res.redirect('/citas');
})

router.delete('/citas/eliminar/:id', (req, res) => {
    Cita.findByIdAndDelete(req.params.id);
    res.redirect('/citas');
});

module.exports = router;