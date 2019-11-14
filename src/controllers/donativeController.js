const controller = {};
const Association = require('../models/association.js')
const paypal = require('paypal-rest-sdk');

controller.indexDonatives = async (req, res) =>{
    const asociations = await Association.find();
    res.render('donatives/donatives.hbs', { asociations });
};
controller.formDonative = async (req, res) =>{
  const asociation = await Association.findById(req.params.id);
  res.render('donatives/donative.hbs', { asociation });
};
controller.donate = async (req, res) =>{
  const moneda = req.body.moneda;
  const frecuencia = req.body.frecuencia;
  const cantidad = req.body.cantidad;
  const user = req.body.user;
  const asociation = await Association.findById(req.body.asociacion);
  const asociacion = asociation._id;


  //configure paypal
  paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AaiT3sLNoYiuydjypcPJfepKTMEXcUcfkMG5_HZ8uaBRo6fcJWdeE5KW5GmoJub7bRpudGXkJ24mFDS-',
  'client_secret': 'EDie4JuxxpeBz1eDbPnVCOw0Qrqy1pKX9ro7ZkDVQjSyd0SjR71TkZd_g-vQLi3qox9DNLIfBUMxjZW0'
  })
  //pay
  const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:3000/success/donate/"+moneda+"/"+cantidad+"/"+asociacion,
        "cancel_url": "http://localhost:3000/cancel/donate"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "Donative to " + asociation.nombre,
                "sku": "001",
                "price": cantidad,
                "currency": moneda,
                "quantity": 1
            }]
        },
        "amount": {
            "currency": moneda,
            "total": cantidad
        },
        "description": "Donacion a la asociacion " + asociation.nombre
      }]
  };
  paypal.payment.create(create_payment_json, function (error, payment) {
  if (error) {
      throw error;
  } else {
      for(let i = 0;i < payment.links.length;i++){
        if(payment.links[i].rel === 'approval_url'){
          res.redirect(payment.links[i].href);
        }
      }
  }
  });


    //res.render('donatives/donative.hbs', { asociation });

};


module.exports = controller;
