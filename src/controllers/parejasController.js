const controller = {};
const Couple = require('../models/Couple.js')

const Message = require('../models/Message.js')
const User = require('../models/User.js')

controller.listParejas = async (req, res) =>{
  const couples = await Couple.find();
  res.render('parejas/parejas.hbs', { couples, layout: 'parejas.hbs'});
};


controller.showDetailCouple = async (req, res) =>{
  const couple = await Couple.findById(req.params.id);
  res.render('parejas/detail-couple.hbs', { couple, layout: 'parejas.hbs'});
};
controller.showReturnCouple = async (req, res) =>{
    const couples = await Couple.find();
    res.render('parejas/parejas.hbs', { couples , layout: 'parejas.hbs'});
};
controller.sendMessage = async (req, res) =>{

  var idPet = req.body.id_pet;
  var idUser = req.body.user;
  var text = req.body.mensaje;
  const pets = await Couple.findById(idPet);
  const userSend = await User.findById(idUser);
  const userReceive = await User.findById(pets.pertenece);

  if(idUser == pets.pertenece){
    req.flash('error_msg', 'Esta mascota te pertenece, no puedes enviar mensaje.');
  }else{
  const send_by = [
    {
      idUser: idUser,
      nameUser: userSend.nombre
    }
  ];
  const received_by = [
    {
      idUser: userReceive._id,
      nameUser: userReceive.nombre
    }
  ];
  const pet = [
    {
      idPet: idPet,
      namePet: pets.nombre,
      pertenece: pets.pertenece
    }
  ];

  const asunto = "Parejas";
  //send message
  const newMessage = new Message({ send_by, received_by, pet, text, asunto});
  req.flash('success_msg', 'Mensaje enviado.');
  await newMessage.save();
}
  res.redirect('/return-couples');

};
module.exports = controller;
