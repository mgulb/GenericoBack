const Ticket = require("../models/ticket");
const { validationResult } = require("express-validator");
const Mongoose = require("mongoose");

exports.generarTickets = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errors: errores.array() });
  }

  try {
    let ticket = new Ticket(req.body);
    await ticket.save();
    res.json({ msg: "Ticket creado correctamente", ticket });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Hubo un error" });
  }
};

exports.listarTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate("userid");
    res.json(tickets);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Hubo un error" });
  }
};
exports.ticketsxuser = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!Mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ msg: "EL producto a eliminar NO EXISTE" });
    }

    if (!ticket) {
      return res.status(404).json({ msg: "EL TICKET NO EXISTE" });
    }
    if (ticket.userid.toString() !== req.user.id) {
      return res.status(401).json({ msg: "NO AUTORIZADO" });
    }
    const tickets = await Ticket.find({ userid: req.user.id });
    res.json(tickets);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Hubo un error" });
  }
};
