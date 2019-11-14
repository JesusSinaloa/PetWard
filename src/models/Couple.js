const mongoose = require('mongoose');
const { Schema } = mongoose;

const CoupleSchema = new Schema({
  tipo: {type: String, required: false},
  nombre: { type: String, required: true},
  apodo: { type: String, required: false},
  edad: {type: String, required: true},
  raza: {type: String, required: false},
  color: {type: String, required: false},
  sexo: {type: Boolean, default: false},
  descripcion: {type: String, required: false},
  imagen0: {type: String, required: true},
  pertenece: {type: String, required: true},
  isCouple: {type: Boolean, default: true},
  ubicacion: [
    {
        estado: {type: String, required: true},
        ciudad: {type: String, required: true},
        calle: {type: String, required: true},
        colonia: {type: String, required: true},
        cp: {type: String, required: true}
    }
  ]

});

module.exports = mongoose.model('Couple', CoupleSchema);
