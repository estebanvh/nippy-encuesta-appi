const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let preguntaSchema = new Schema({

    descripcion: {
        type: String,
        required: true
    },
    fechaCreacion: {
        type: String,
        required: true
    },
    encuesta: {
        type: mongoose.Types.ObjectId,
        ref: 'Encuesta',
        required: true
    },
    usuario: {
        type: mongoose.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

})

module.exports = mongoose.model('Pregunta', preguntaSchema);