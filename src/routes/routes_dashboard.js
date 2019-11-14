const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Pet = require('../models/Pet');
const Couple = require('../models/Couple');
const dashboardController = require('../controllers/dashboardController.js');
const Asociation = require('../models/association');
const Audition = require('../models/audition');
const paypal = require('paypal-rest-sdk');

//LOGIN-DASH
router.get('/perfil/:id', dashboardController.showPerfil);
router.get('/perfil-asociation/:id', dashboardController.showPerfilAsociation);

router.post('/perfil/edit-image-perfil', dashboardController.editImagePerfil);

router.put('/perfil/edit-perfil/:id', async (req, res) => {

  const {nombre, apellidos, estado, ciudad, email, telefono, sexo} = req.body;
  await User.findByIdAndUpdate(req.params.id, { nombre, apellidos, sexo, email, telefono, estado, ciudad });

  const success_msg = "Se Actualizo Exitosamente";
  res.render('dashboard/index.hbs', {success_msg, layout: 'dashboard.hbs'});
});
router.put('/perfil/edit-perfil-asociation/:id', async (req, res) => {
  const {id_user, nombre, email, calle, colonia, estado, ciudad, cp, telefono, facebook, instagram, twitter, google, alojadas, donativos, rescates, meritos, descripcion} = req.body;
  const ubicacion = [
    {
      estado: estado,
      ciudad: ciudad,
      calle: calle,
      colonia: colonia,
      cp: cp
    }
  ];
  const social = [
    {
      facebook: facebook,
      instagram: instagram,
      twitter: twitter,
      google: google
    }
  ]
  await Asociation.findByIdAndUpdate(req.params.id, { nombre, id_user, email, telefono, ubicacion, social, alojadas, donativos, rescates, meritos, descripcion });
  await User.findByIdAndUpdate(id_user, { nombre, email, telefono, estado, ciudad });
  const success_msg = "Se Actualizo Exitosamente";
  res.render('dashboard/index.hbs', {success_msg, layout: 'dashboard.hbs'});

});
//LOGIN-DASH
router.get('/messages/:id', dashboardController.showMessages);

router.get('/register-pet', dashboardController.showRegisterPet);
router.post('/register-pet/new-pet', dashboardController.registerPet);
router.get('/register-couple', dashboardController.showRegisterCouple);
router.post('/register-pet/new-couple', dashboardController.registerCouple);
router.get('/detail-message/:id', dashboardController.detailMessage);
router.get('/delete-message/:id', dashboardController.deleteMessage);
router.post('/messages/send-response', dashboardController.sendResponse);
router.get('/my-pets/:id', dashboardController.myPets);
router.get('/my-pets-adoption/:id', dashboardController.myPetsAdoption);
router.get('/my-pets-couple/:id', dashboardController.myPetsCouple);
router.get('/donations/:id', dashboardController.donations);
router.get('/detail-donative/:id', dashboardController.detailDonative);
router.delete('/delete-pet/:id', dashboardController.deletePet);
router.delete('/delete-couple/:id', dashboardController.deleteCouple);
router.get('/edit-pet/:id', dashboardController.editPet);
router.get('/edit-couple/:id', dashboardController.editCouple);
router.put('/pet/update-pet/:id', async (req, res) => {
  const {nombre, edad, raza, color, sexo, tipo, descripcion, anemia, respiratorio, fracturas, lesiones, esterilizado, urinarios, alergias, diabetes, oculares, voz, oido, dental, garrapatas, pulgas, sarna, otros, vacuna1Perro, vacuna2Perro, vacuna3Perro, vacuna4Perro, vacuna5Perro, vacuna6Perro,vacuna1Gato, vacuna2Gato, vacuna3Gato, vacuna4Gato, vacuna5Gato, vacuna6Gato, estado, ciudad, calle, colonia, cp} = req.body;
  const salud = [
    {
      anemia: anemia,
      respiratorio: respiratorio,
      fracturas: fracturas,
      lesiones: lesiones,
      esterilizado: esterilizado,
      urinarios: urinarios,
      alergias: alergias,
      diabetes: diabetes,
      oculares: oculares,
      voz: voz,
      oido: oido,
      dental: dental,
      garrapatas: garrapatas,
      pulgas: pulgas,
      sarna: sarna,
      otros: otros
    }
  ];
var vacunas = [];
  if(tipo == "perro"){
   vacunas = [
    {
      vacuna1: vacuna1Perro,
      vacuna2: vacuna2Perro,
      vacuna3: vacuna3Perro,
      vacuna4: vacuna4Perro,
      vacuna5: vacuna5Perro,
      vacuna6: vacuna6Perro
    }
  ];
}else{
  if(tipo == "gato"){

     vacunas = [
      {
        vacuna1: vacuna1Gato,
        vacuna2: vacuna2Gato,
        vacuna3: vacuna3Gato,
        vacuna4: vacuna4Gato,
        vacuna5: vacuna5Gato,
        vacuna6: vacuna6Gato
      }
    ];
  }
}
  const ubicacion = [
    {
      estado: estado,
      ciudad: ciudad,
      calle: calle,
      colonia: colonia,
      cp: cp
    }
  ];
  console.log(vacunas);
  await Pet.findByIdAndUpdate(req.params.id, { sexo, tipo, nombre, edad, raza, color, descripcion, salud, vacunas, ubicacion });
  const success_msg = "Se Actualizo Exitosamente";
  res.render('dashboard/index.hbs', {success_msg, layout: 'dashboard.hbs'});
});
router.put('/pet/update-couple/:id', async (req, res) => {
  const {nombre, edad, raza, color, sexo, tipo, apodo, descripcion, estado, ciudad, calle, colonia, cp} = req.body;

  const ubicacion = [
    {
      estado: estado,
      ciudad: ciudad,
      calle: calle,
      colonia: colonia,
      cp: cp
    }
  ];

  await Couple.findByIdAndUpdate(req.params.id, { sexo, tipo, nombre, apodo, edad, raza, color, descripcion, ubicacion });
  const success_msg = "Se Actualizo Exitosamente";
  res.render('dashboard/index.hbs', {success_msg, layout: 'dashboard.hbs'});
});

router.post('/adopt/message/status', dashboardController.editStatusAdopted);
router.get('/adoptions/:id', dashboardController.adoptions);
router.get('/my-adoptions/:id', dashboardController.myAdoptions);
router.get('/give-for-adoption/:id', dashboardController.giveAdoptions);
router.get('/adoption/info-my-adoption/:id', dashboardController.detailMyAdoptions);
router.get('/adoption/info-give-adoption/:id', dashboardController.detailMyAdoptions);
router.get('/auditar-pet/:id', dashboardController.auditarPet);

function save_audition (pay_json, send, received, pet){
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

  const idUser = received;
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
  const data = [
    {
      idPet: pet,
      send_by: received,
      received_by: send
    }
  ];

  const newAudition = new Audition({ id, idUser, state, payer, transaction, data });
  newAudition.save();
  console.log("Success Save...");
}
router.get('/success/asociation-pay/:send/:received/:pet', (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;
  const send= req.params.send;
  const received = req.params.received;
  const pet = req.params.pet;

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
  res.render('audition/success.hbs', { payment });

  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
        "amount": {
            "currency": "MXN",
            "total": "250.00"
        }
    }]
  };

  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
        console.log(error.response);
        throw error;
    } else {
        const pay_json = JSON.stringify(payment);
        save_audition(pay_json, send, received, pet);
    }
  });

});

router.get('/cancel/asociation-pay', (req, res) => res.send('Cancelled'));
router.get('/show-auditions/:id', dashboardController.showAuditions);
router.get('/auditions/view-audition/:id', dashboardController.viewAudition);


module.exports = router;
