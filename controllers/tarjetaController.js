// SDK de Mercado Pago
const mercadopago = require ('mercadopago');


exports.mercadodepago=(req,res)=>{
 //number
 const {entero}=req.query;
//console.log(req.body)
 console.log(parseInt(entero))
const  entero1=parseInt(entero);
 
let preference = {
  items: [
    {
      title: 'Varios',
      unit_price:entero1,
      quantity: 1
    }
  ]
}

preference.back_urls={"success":"https://localhost:3000/Home/Tienda"}
preference.auto_return="approved";

mercadopago.preferences.create(preference)

.then(function(response){
// Este valor reemplazará el string "<%= global.id %>" en tu HTML
  global.id = response.body.id;
  console.log("glonal=",global.id)
  console.log(response.body.init_point)
  const dire=response.body.init_point;
  res.json({ msg: "Compra Completada ", dire});
  
  res.send(response.body.init_point);
}).catch(function(error){
  console.log(error);
});

}