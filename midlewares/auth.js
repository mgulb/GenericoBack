const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("x-token");
  if (!token) {
    res.status(401).json({ msg: "No hay token acceso denegado" });
  }

  try {
    const verificado = jwt.verify(token, process.env.SECRET);
    req.user = verificado.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token no valido" });
  }
};
