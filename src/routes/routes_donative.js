const express = require('express');
const router = express.Router();
const paypal = require('paypal-rest-sdk');
const donativeController = require('../controllers/donativeController.js')
const Donation = require('../models/Donation');

router.post('/donative/send', donativeController.donate);

function save_donation (pay_json, id_asociacion){
  const json = JSON.parse(pay_json);
  const id = json.id;
  const state = json.state;
  const email = json.payer.payer_info.email;
  const nombres = json.payer.payer_info.first_name;
  const apellidos = json.payer.payer_info.last_name;
  const payer_id = json.payer.payer_info.payer_id;
  const total = json.transactions[0].amount.total;
  const currency = json.transactions[0].amount.currency;
  const description = json.transactions[0].description;

  const payer = [
    {
      email: email,
      nombre: nombres,
      apellido: apellidos,
      id: payer_id
    }
  ];

  const transaction = [
    {
      total: total,
      currency: currency,
      description: description
    }
  ];

  const newDonation = new Donation({ id, state, payer, transaction, id_asociacion });
 newDonation.save();
  console.log("Success Save...");
}


router.get('/success/donate/:currency/:quantity/:asociacion', (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;
  const currency = req.params.currency;
  const quantity = req.params.quantity;
  const asociacion = req.params.asociacion;

  //configure paypal
  paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AaiT3sLNoYiuydjypcPJfepKTMEXcUcfkMG5_HZ8uaBRo6fcJWdeE5KW5GmoJub7bRpudGXkJ24mFDS-',
  'client_secret': 'EDie4JuxxpeBz1eDbPnVCOw0Qrqy1pKX9ro7ZkDVQjSyd0SjR71TkZd_g-vQLi3qox9DNLIfBUMxjZW0'
  })

  const payment = [
    {
      payerId: payerId,
      paymentId: paymentId
    }
  ];
  res.render('donatives/success.hbs', { payment });

  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
        "amount": {
            "currency": currency,
            "total": quantity
        }
    }]
  };

  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
        console.log(error.response);
        throw error;
    } else {
        const pay_json = JSON.stringify(payment);
        save_donation(pay_json, asociacion);
    }
});

});

router.get('/cancel/donate', (req, res) => res.send('Cancelled'));
module.exports = router;
