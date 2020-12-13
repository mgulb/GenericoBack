const mongoose = require("mongoose");

const TicketSchema = mongoose.Schema({
  /*detalle:[({type:mongoose.Schema.Types.ObjectId ,ref:"producto"},
            {nombret:{type:String}},
            {cantidadt:{type:Number}},
            {preciot:{type:String}},
             {total:{type:String}})],*/

  detalle: [
    {
      _id: { type: String },
      nombre: { type: String },
      cantidad: { type: Number },
      precio: { type: String },
      total: { type: String },
    },
  ],

  nombreProducto: {
    type: String,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  domicilioEnvio: {
    type: String,
  },

  totalSale: {
    type: Number,
  },
  pago: {
    type: String,
    default: "efectivo",
  },
  fechaCompra: {
    type: Date,
    default: Date.now(),
  },
});
//post
//get
module.exports = mongoose.model("ticket", TicketSchema);
