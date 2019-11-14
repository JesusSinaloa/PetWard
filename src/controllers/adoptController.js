const controller = {};
const Pet = require('../models/Pet.js')
const User = require('../models/User');
const Message = require('../models/Message.js');
controller.sendMessage = async (req, res) =>{

  var idPet = req.params.id;
  var idUser = req.params.user;

  const pets = await Pet.findById(idPet);
  const userSend = await User.findById(idUser);
  const userReceive = await User.findById(pets.pertenece);
  const text = "Alguien esta interesado en adoptar a tu amigo";

  if(idUser == pets.pertenece){

    req.flash('error_msg', 'Esta mascota te pertenece, no puedes adoptarla.');
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

  const asunto = "Adopcion";
  //send message
  const newMessage = new Message({ send_by, received_by, pet, text, asunto});
  req.flash('success_msg', 'Mensaje enviado.');
  await newMessage.save();
}
  res.redirect('/detail-pet/'+idPet);

};


module.exports = controller;
