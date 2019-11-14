const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new Schema({
  send_by: [
    {
      idUser: { type: String, required: true},
      nameUser: { type: String, required: true}
    }
  ],
  received_by: [
    {
      idUser: { type: String, required: true},
      nameUser: { type: String, required: true}
    }
  ],
  pet: [
    {
      idPet: { type: String, required: true},
      namePet: { type: String, required: true},
      pertenece: { type: String, required: true}
    }
  ],
  text: { type: String, required: true},
  asunto: { type: String, required: true},
  isRead: { type: Boolean, default: false},
  dateCreated: { type: Date, default: Date.now}

});

module.exports = mongoose.model('Message', MessageSchema);
