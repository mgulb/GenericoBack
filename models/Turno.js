const mongoose = require("mongoose");

// Definir el Schema
const TurnoSchema = mongoose.Schema({
  motivoTurno: {
    type: String,
    required: true,
    trim: true,
  },
  diaHoraTurno: {
    type: Date,
    required: true,
    trim: true,
  },
  nombreTurno: {
    type: String,
    required: true,
    trim: true,
  },
  apellidoTurno: {
    type: String,
    required: true,
    trim: true,
  },
  telefonoTurno: {
    type: String,
    required: true,
    trim: true,
  },
  detalleTurno: {
    type: String,
    required: true,
    trim: true,
  },
});

// Define el modelo Usuario con el Schema
module.exports = mongoose.model("Turno", TurnoSchema);
