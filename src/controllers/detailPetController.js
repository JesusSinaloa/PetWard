const controller = {};
const Pet = require('../models/Pet.js')
const User = require('../models/User.js');
const Asociation = require('../models/association.js');


controller.showView = async (req, res) =>{

  const pets = await Pet.findById(req.params.id);
  const dataUser = await User.findById(pets.pertenece);
  const dataAscociation = await Asociation.find({id_user: dataUser._id});

  res.render('detail-pet/detail-pet.hbs', { pets, dataUser, dataAscociation});
};

module.exports = controller;
