const moongose = require('mongoose');
const { Schema } = moongose;
const bcrypt = require('bcryptjs');

const UsuarioSchema = new Schema({
    nombre: { type: String, required: true},
    email: { type: String, requiredL: true},
    password: { type: String, required: true},
});

UsuarioSchema.methods.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
}

UsuarioSchema.methods.matchPassword = function(password) {
    return bcrypt.compare(password, this.password);
}

module.exports = moongose.model('Usuario', UsuarioSchema)