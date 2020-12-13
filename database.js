const mongoose = require("mongoose");

//const URI=process.env.BASEDEDATOS;
const URI = process.env.DB_MONGO;

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

mongoose
  .connect(URI, OPTIONS)
  .then((db) => console.log("Base de datos conectada."))
  .catch((error) => {
    console.error(error);
    process.exit(1); // Detiene el servidor
  });

module.exports = mongoose;
