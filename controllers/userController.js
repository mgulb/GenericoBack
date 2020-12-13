const User = require("../models/user");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.crearUser = async (req, res) => {
  /*const errores =validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errors:errores.array()});
    }*/
  let { mail, password } = req.body;
  try {
    let user = await User.findOne({ mail });
    if (user) {
      return res.status(400).json({ msg: "El mail ingresado ya existe" });
    }
    user = new User(req.body);
    user.password = bcryptjs.hashSync(password, 10);
    await user.save();
    //pongo lo que tendra el payload
    const payload = {
      user: {
        id: user.id,
        mail: user.mail,
      },
    };
    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: "180d",
      },
      (error, token) => {
        //si hubiera un error
        if (error) throw error;
        res.json({ msg: "Usuario creado correctamente ", user, token });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Hubo un error" });
  }
};
exports.listarUser = async (req, res) => {
  try {
    let user = await User.find();
    if (!user) {
      return res.status(404).json({ msg: "No hay usuarios a listar ." });
    }
    //    const option={
    //    page:page? page :1

    //   }

    user = await User.find(); //paginate({},option);
    res.json({ msg: user });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ msg: "Hubo un error y no se pudieron listar los Usuarios." });
  }
};
