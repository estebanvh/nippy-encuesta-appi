const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let encuestaSchema = new Schema({

    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        unique: true
    },
    descripcion: {
        type: String,
        required: false
    },
    fechaInicio: {
        type: String,
        required: [true, 'Fecha Finalización de encuesta obligatorio']
    },
    fechaFin: {
        type: String,
        required: [true, 'Fecha Finalización de encuesta obligatorio']
    },
    fechaCreacion: {
        type: String,
        required: true
    },
    activa: {
        type: Boolean,
        required: true,
        default: false
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true

    }


});

encuestaSchema.plugin(uniqueValidator, { message: ' {PATH} debe ser único' })

module.exports = mongoose.model('Encuesta', encuestaSchema);