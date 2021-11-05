const moongose = require('mongoose');
const { Schema } = moongose;
const bcrypt = require('bcryptjs');


const UsuarioSchema = new Schema({
    nombre: { type: String, required: true},
    email: { type: String, requiredL: true},
    pass: { type: String, required: true},
    password: { type: String, required: true},
});

UsuarioSchema.methods.encryptPassword = async (pass) => {
    const salt = await bycrypt.genSalt(10);
    const hash = bycrypt.hash(password, salt);
    return hash;
}

UsuarioSchema.methods.matchPassword = async function (pass) {
    return await bcrypt.compare(pass, this.pass);
};

module.exports = moongose.model('Usuario', UsuarioSchema)