const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  nombre: { type: String, required: true},
  apellidos: { type: String, required: false},
  password: { type: String, required: true},
  sexo: { type: String, required: false},
  email: { type: String, required: true},
  telefono: { type: String, required: true},
  estado: { type: String, required: true},
  ciudad: { type: String, required: true},
  image: {type: String, required: false},
  role: {type: Boolean, default: false}
});
//METODO PARA ENCRIPTAR
UserSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hash(password, salt);
  return hash;
};
//METODO PARA COMPARAR CONTRASEÑAS
UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
module.exports = mongoose.model('User', UserSchema);
