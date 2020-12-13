const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const morgan = require("morgan");
const mongoose = require("./database");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const mercadopago=require("mercadopago")
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ extended: true, limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
mercadopago.configure({
  access_token: 'TEST-3776508394848180-121023-3c0781d267eeb673acf739aa02196456-608827516'
});

//rutas
app.use("/api", require("./routes"));

//creo un transporte
const transporte = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "gimenalazarte7@gmail.com",
    pass: "esteban30514",
  },

  /* auth:{
        user:'giglimagustin@gmail.com',
        pass:'(GoHaN)666'
    }*/
});
app.post("/api/enviarEmail", async (req, res) => {
  const { subject, mail, msg, mailuser } = req.body;

  try {
    let mailOptions = {
      from: "mgulb@live.com.ar",
      to: mail,
      subject: subject,
      text: msg,
      html: `<h3 className="text-success"> Hola ${mail} !!!  </h3>
               <h1>Te envio un mail ${mailuser}</h1>
              <p>Su texto dice : ${msg}</p>
             
               `,
    }; // html body

    const envio = await transporte.sendMail(mailOptions);
    res.json({ msg: "enviado mail" });
  } catch (error) {
    res.status(404).json({ msg: "hubo un error", error });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`escucha el puertos ${PORT}`);
});
