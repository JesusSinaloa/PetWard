const mongoose = require('mongoose');
const { Schema } = mongoose;

const PetSchema = new Schema({
  tipo: {type: String, required: false},
  nombre: { type: String, required: true},
  edad: {type: String, required: true},
  raza: {type: String, required: false},
  casta: {type: String, required: false},
  color: {type: String, required: false},
  sexo: {type: Boolean, default: false},
  descripcion: {type: String, required: false},
  search: {type: String, required: false},
  imagen0: {type: String, required: true},
  imagen1: {type: String, required: true},
  imagen2: {type: String, required: true},
  imagen3: {type: String, required: true},
  pertenece: {type: String, required: true},
  adopted: [
    {
      isAdopted: {type: Boolean, default: false},
      date: {type: String, required: false},
      byWhat: {type: String, required: false},
      proccess: {type: String, required: false, default: "0"}
    }
  ],
  isCouple: {type: Boolean, default: false},
  salud: [
    {
        anemia: {type: String, required: false},
        respiratorio: {type: String, required: false},
        fracturas: {type: String, required: false},
        lesiones: {type: String, required: false},
        esterilizado: {type: String, required: false},
        urinarios: {type: String, required: false},
        alergias: {type: String, required: false},
        diabetes: {type: String, required: false},
        oculares: {type: String, required: false},
        voz: {type: String, required: false},
        oido: {type: String, required: false},
        dental: {type: String, required: false},
        garrapatas: {type: String, required: false},
        pulgas: {type: String, required: false},
        sarna: {type: String, required: false},
        otros: {type: String, required: false}
    }
  ],
  vacunas: [
    {
    vacuna1: {type: Boolean, default: false},
    vacuna2: {type: Boolean, default: false},
    vacuna3: {type: Boolean, default: false},
    vacuna4: {type: Boolean, default: false},
    vacuna5: {type: Boolean, default: false},
    vacuna6: {type: Boolean, default: false}
    }
  ],

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

module.exports = mongoose.model('Pet', PetSchema);
