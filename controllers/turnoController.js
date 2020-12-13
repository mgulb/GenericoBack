const Turno = require("../models/Turno");
const { validationResult } = require("express-validator");
const moment = require("moment");
exports.crearTurno = async (req, res) => {
  const errores = validationResult(req);
  /*if(!errores.isEmpty()){
        return res.status(400).json({errors:errores.array()});
    }*/

  try {
    let turno = new Turno(req.body);
    await turno.save();
    res.json({ msg: "Turno creado correctamente", turno });
  } catch (error) {
    console.error("error =", error);
    res.status(400).json({ msg: "Hubo un error" });
  }
};
exports.listarTurno = async (req, res) => {
  try {
    const turnos = await Turno.find();
    res.json(turnos);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Hubo un error" });
  }
};
exports.listarTurnoxdia = async (req, res) => {
  try {
    let day = moment().format("YYYY-MM-DD");
    let day1 = moment().add(1, "days").format("YYYY-MM-DD");

    const turnosdia = await Turno.find({
      diaHoraTurno: { $gte: day, $lt: day1 },
    });
    // moment().date(Number)

    if (!turnosdia) {
      return res.status(400).json({ msg: "No hay turnos este dia" });
    }
    res.json(turnosdia);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Hubo un error" });
  }
};
