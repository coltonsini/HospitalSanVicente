const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
    res.render('index');
    
})

router.get('/aboutUs', (req, res) =>{
    res.render('aboutUs');
})

router.get('/contactUs', (req, res) =>{
    res.render('contact');
})

router.get('/Services', (req, res) =>{
    res.render('service');
})

module.exports = router;