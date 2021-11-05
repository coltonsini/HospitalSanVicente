const moongose = require('mongoose');
const { Schema } = moongose;

const CitaSchema = new Schema({
    title: { type: String, required: true},
    description: { type: String, required: true},
    date: { type: Date, default: Date.now },
    user: { type: String}
});

module.exports = moongose.model('Cita', CitaSchema)