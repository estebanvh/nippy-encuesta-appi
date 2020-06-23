const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
}

let Schema = mongoose.Schema;
let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    email: {
        type: String,
        required: [true, 'El correo es necesario'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    rol: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    fechaCreacion: {
        type: String,
        required: true
    }

})

//cada vez que se imprime el modelo, llama esta función para modificar el return del modelo
usuarioSchema.methods.toJSON = function() {

    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}


mongoose.plugin(uniqueValidator, { message: '{PATH} debe ser único' });
module.exports = mongoose.model('Usuario', usuarioSchema);