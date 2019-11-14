const mongoose = require('mongoose');
const { Schema } = mongoose;

const AssociationSchema = new Schema({
  nombre: { type: String, required: true},
  id_user: { type: String, required: true},
  logo_img: {  type: String, required: false},
  email: { type: String, required: true},
  telefono: { type: String, required: true},
  imagen0: { type: String, required: false},
  imagen1: { type: String, required: false},
  imagen2: { type: String, required: false},
  imagen3: { type: String, required: false},
  imagen4: { type: String, required: false},
  imagen5: { type: String, required: false},
  imagen6: { type: String, required: false},
  imagen7: { type: String, required: false},
  video0: { type: String, required: false},
  video1: { type: String, required: false},
  video2: { type: String, required: false},
  ubicacion: [
    {
      estado: {type: String, required: true},
      ciudad: {type: String, required: true},
      calle: {type: String, required: true},
      colonia: {type: String, required: true},
      cp: {type: String, required: true}
    }
  ],
  social: [
    {
      facebook: {type: String, required: true},
      instagram: {type: String, required: true},
      twitter: {type: String, required: true},
      google: {type: String, required: true}
    }
  ],
  alojadas: { type: String, required: true},
  donativos: { type: String, required: true},
  rescates: { type: String, required: true},
  meritos: { type: String, required: true},
  cuenta: { type: String, required: false},
  descripcion: { type: String, required: true}

});

module.exports = mongoose.model('association', AssociationSchema);
