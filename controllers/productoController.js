const Producto = require("../models/producto");
const { validationResult } = require("express-validator");
const Mongoose = require("mongoose");

exports.crearProducto = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errors: errores.array() });
  }

  try {
    let producto = new Producto(req.body);
    await producto.save();
    res.json({ msg: "Producto creado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Hubo un error" });
  }
};
//Listar productos
exports.listarProductos = async (req, res) => {
  const { page } = req.query;
  try {
    let productos = await Producto.find();

    if (!productos) {
      return res.status(404).json({ msg: "No hay Productos a  listar ." });
    }
    const option = {
      page: page ? page : 1,
    };
    // productos = await Producto.find();//paginate({},option);
    productos = await Producto.paginate({}, option);
    res.json({ productos });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ msg: "Hubo un error y no se pudieron listar los productos." });
  }
};
exports.listarProductosxCategoria = async (req, res) => {
  const { page } = req.query;
  const { categoria } = req.query;
  try {
    const producto = await Producto.find({ categoria });

    if (!producto || "") {
      return res
        .status(404)
        .json({ msg: "No hay productos con esta categoria" });
    }
    const option = {
      page: page ? page : 1,
    };
    const productos = await Producto.paginate({ categoria }, option);
    res.json({ productos });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({
        msg:
          "Hubo un error y no se pudieron mostrar los productos por categoría.",
      });
  }
};
exports.listarProducto = async (req, res) => {
  try {
    let producto = await Producto.find(req.body.id);
    if (!producto) {
      return res.status(404).json({ msg: "El producto a listar no existe." });
    }

    res.json({ msg: producto });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Hubo un error" });
  }
};
exports.listarP = async (req, res) => {
  try {
    let prod = await Producto.find();
    if (!prod) {
      return res.status(404).json({ msg: "El producto a listar no existe." });
    }

    res.json({ prod });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Hubo un error" });
  }
};

exports.modificarProducto = async (req, res) => {
  try {
    if (!Mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ msg: "EL producto a modificar no existe" });
    }
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ msg: "EL producto a modificar no existe" });
    }
    const nuevoProducto = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ msg: "La tarea fue modificada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Hubo un error" });
  }
};

exports.eliminarProducto = async (req, res) => {
  try {
    if (!Mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ msg: "EL producto a eliminar no existe" });
    }
    const producto = await Producto.findById(req.params.id);

    if (!producto) {
      return res.status(404).json({ msg: "EL producto a eliminar no existe" });
    }
    await producto.remove();
    res.json({ msg: "La tarea fue eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Hubo un error" });
  }
};

exports.listarProductosSearch = async (req, res) => {
  const { page } = req.query;
  const { search } = req.query;
  try {
    const prod = await Producto.find(
      { nombreProducto: { $regex: search, $options: "i" } } || {
        categoria: { $regex: search, $options: "i" },
      }
    );
    if (!prod || "") {
      return res
        .status(404)
        .json({ msg: "No hay productos con esta busqueda" });
    }
    const option = {
      page: page ? page : 1,
    };
    const productos = await Producto.paginate(
      { nombreProducto: { $regex: search, $options: "i" } } || {
        categoria: { $regex: search, $options: "i" },
      },
      option
    );

    res.json({ productos });
    res.json({ productos });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ msg: "Hubo un error y no se pudieron mostrar los productos ." });
  }
};
