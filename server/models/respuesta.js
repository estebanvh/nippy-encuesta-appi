const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let respuestaSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    respuesta: {
        type: String,
        required: false
    },
    fecha: {
        type: String,
        required: false,
        default: new Date().getTime()
    },
    pregunta: {
        type: mongoose.Types.ObjectId,
        ref: 'Pregunta'
    }
});


module.exports = mongoose.model('Respuesta', respuestaSchema);