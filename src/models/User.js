const moongose = require('mongoose');
const { Schema } = moongose;

const UsuarioSchema = new Schema({
    nombre: { type: String, required: true},
    email: { type: String, requiredL: true},
    password: { type: String, required: true},
});

module.exports = moongose.model('Usuario', UsuarioSchema)