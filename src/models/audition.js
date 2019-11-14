const mongoose = require('mongoose');
const { Schema } = mongoose;

const AuditionSchema = new Schema({
  id: {type: String, required: false},
  idUser: {type: String, required: false},
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
  data: [
    {
        idPet: {type: String, required: true},
        send_by: {type: String, required: true},
        received_by: {type: String, required: true}
    }
  ],
  status: {type: String, required: false, default: "En proceso"},
  dateCreated: { type: Date, default: Date.now}
});

module.exports = mongoose.model('Audition', AuditionSchema);
