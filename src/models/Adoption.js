const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdoptionSchema = new Schema({
  idPet: {type: String, required: true},
  date: { type: Date, default: Date.now},
  byWhat: {type: String, required: true},
  whose: {type: String, required: true}

});

module.exports = mongoose.model('Adoption', AdoptionSchema);
