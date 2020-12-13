const User = require("../models/user");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.loguin = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errors: errores.array() });
  }
  let { mail, password } = req.body;
  try {
    let user = await User.findOne({ mail });
    console.log("este es user",user)
    if (!user) {
      console.log("Mail incorrecto");
      return res.status(400).json({ msg: "El email incorrecto" });
    }
    let passwordCorrecto = await bcryptjs.compare(password, user.password);
    if (!passwordCorrecto) {
      return res.status(400).json({ msg: "El  contrasena es incorrecta" });
    }

    //pongo lo que tendra el payload
    const payload = {
      user: {
        id: user.id,
        mail: user.mail,
      },
    };
    console.log(payload);
    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: "180d",
      },
      (error, token) => {
        //si hubiera un error
        if (error) throw error;
        res.json({ msg: "retorno usuario y token", user, token });
      }
    );
  } catch (error) {
    return res.status(400).json({ errors: errores.array() });
  }
};
