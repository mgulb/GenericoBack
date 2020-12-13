const mongoose = require("mongoose");

// Definir el Schema
const UserSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  apellido: {
    type: String,
    required: true,
    trim: true,
  },
  domicilio: {
    type: String,
    required: true,
    trim: true,
  },
  localidad: {
    type: String,
    trim: true,
  },
  provincia: {
    type: String,
    required: true,
    trim: true,
  },
  cpostal: {
    type: Number,
    required: true,
    trim: true,
  },

  mail: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  user: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  isUser: {
    type: Boolean,
    default: true,
  },
});

// Define el modelo Usuario con el Schema
module.exports = mongoose.model("user", UserSchema);
