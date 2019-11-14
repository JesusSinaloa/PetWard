const mongoose = require('mongoose');
const { Schema } = mongoose;

const DonationSchema = new Schema({
  id: {type: String, required: false},
  state: { type: String, required: true},
  payer: [
    {
        email: {type: String, required: true},
        nombre: {type: String, required: true},
        apellido: {type: String, required: true},
        id: {type: String, required: true}
    }
  ],
  transaction: [
    {
        total: {type: String, required: true},
        currency: {type: String, required: true},
        description: {type: String, required: true}
    }
  ],
  id_asociacion: {type: String, required: true},
  redireccionada: {type: Boolean, default: false},
  id_redireccion: {type: String, required: false},
  dateCreated: { type: Date, default: Date.now}
});

module.exports = mongoose.model('Donation', DonationSchema);
