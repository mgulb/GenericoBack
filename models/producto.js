const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

// Definir el Schema
const ProductoSchema = mongoose.Schema({
  nombreProducto: {
    type: String,
    required: true,
    trim: true,
  },
  categoria: {
    type: String,
    required: true,
    trim: true,
  },
  descripcion: {
    type: String,
    required: true,
    trim: true,
  },

  precio: {
    type: Number,
    required: true,
    trim: true,
  },
  stock: {
    type: Number,
    required: true,
    trim: true,
  },
  imgBase64: {
    type: String,
    trim: true,
  },
  cantidad: {
    type: Number,
    default: 0,
  },
});
ProductoSchema.plugin(mongoosePaginate);
mongoosePaginate.paginate.options = {
  limit: 6,

  customLabels: {
    docs: "Productos",
    totalDocs: "TotalProductos",
  },
};

//

// Define el modelo Producto con el Schema
module.exports = mongoose.model("Producto", ProductoSchema);
