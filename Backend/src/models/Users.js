const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    email: String,
    password: String,
    cursos: [{
        curso:String,
        asignaturas: [{
            nombre: String,
            codigo: String,
            practicas: Number,
            teoria: Number,
            grupos: Number
        }]
    }]
}, {
    timestamps: true,
});

module.exports = model('User', userSchema);