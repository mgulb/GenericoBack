const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async (req, res, next) => {
  const token = req.header("x-token");
  if (!token) {
    res.status(401).json({ msg: "No hay token acceso denegado" });
  }

  try {
    const verificado = jwt.verify(token, process.env.SECRET);
    req.user = verificado.user;
    let { mail } = req.user;

    let persona = await User.findOne({ mail });

    if (persona) {
      //return res.status(400).json({msg:'El mail ingresado ya existe'});

      if (persona.isUser == true) {
        return res.status(401).json({ msg: " Acceso denegado" });
      }
      next();
    }
  } catch (error) {
    res.status(401).json({ msg: "Token no valido o acceso denegado" });
  }
};
