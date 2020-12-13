const express = require("express");
const router = express.Router();
// SDK de Mercado Pago
const mercadopago = require ('mercadopago');
const userController = require("./controllers/userController");
const productoController = require("./controllers/productoController");
const turnoController = require("./controllers/turnoController");
const authController = require("./controllers/authController");
const ticketControllers = require("./controllers/ticketControllers");
const tarjetaController=require("./controllers/tarjetaController")
const { check } = require("express-validator");
const auth = require("./midlewares/auth");
const authadmin = require("./midlewares/authadmin");
const moment = require("moment");

router.post(
  "/user/",
  // [
  /* check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("apellido", "El apellido es obligatorio").not().isEmpty(),
    check("mail", "El mail  debe ser valido").isEmail(),
    check("mail", "El mail  es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio").not().isEmpty(),
    check(
      "password",
      "El password debe ser valido con minimo 6 caracteres "
    ).isLength({ min: 6 }),*/
  //],
  userController.crearUser
);
router.post(
  "/auth/",
  [
    check("mail", "El mail  debe ser valido").isEmail(),
    check("mail", "El mail  es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio").not().isEmpty(),
    check(
      "password",
      "El password debe ser valido con minimo 6 caracteres "
    ).isLength({ min: 6 }),
  ],
  authController.loguin
);
router.get("/user/", userController.listarUser);
router.post(
  "/producto/",
  authadmin,
  [
    check("nombreProducto", "El nombre del producto es  obligatorio")
      .not()
      .isEmpty(),
    check("categoria", "La categoria es obligatoria").not().isEmpty(),
    check("descripcion", "la descripcion es obligatoria").not().isEmpty(),
    check("precio", "El precio es obligatorio").not().isEmpty(),
    check("precio", "El precio debe ser un decimal").isDecimal(),
    check("stock", "El stock es obligatorio").not().isEmpty(),
  ],
  productoController.crearProducto
);
//rutas  Productos
router.get("/productosBusqueda/", productoController.listarProductosSearch);

router.get("/productosVarios/", productoController.listarP);
router.get("/producto/", productoController.listarProducto);
router.get("/productos/", productoController.listarProductos);
router.get(
  "/productosCategoria/",
  productoController.listarProductosxCategoria
);
router.put("/producto/:id/", productoController.modificarProducto);
router.delete("/producto/:id/", productoController.eliminarProducto);
//rutas turnos
router.post(
  "/turno/",
  [
    /*  check("motivoTurno", "El motivo es  obligatorio").not().isEmpty(),
   //check("diaHoraTurno", "El horario es obligatorio").not().isEmpty(),
    //2010-04-29T18:30:00.000Z
    check("nombreTurno", "El nombre es obligatorio").not().isEmpty(),
    check("apellidoTurno", "El apellido es obligatorio").not().isEmpty(),
    check("telefonoTurno", "El telefono es obligatorio").not().isEmpty(),
    check("telefonoTurno", "El telefono es obligatorio").isMobilePhone(),
    check("detalleTurno", "El detalle es obligatorio").not().isEmpty(),*/
  ],
  turnoController.crearTurno
);
router.post("/ticket/", auth, ticketControllers.generarTickets);
router.get("/ticket/", auth, ticketControllers.listarTickets);
router.get("/ticket/:id", auth, ticketControllers.ticketsxuser);

router.get("/turno/", turnoController.listarTurno);
router.get("/turnoxdia/", turnoController.listarTurnoxdia);
router.post("/mercadodepago/", tarjetaController.mercadodepago);
module.exports = router;
