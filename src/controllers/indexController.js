const controller = {};
const Pet = require('../models/Pet.js')
const User = require('../models/User.js')
const Association = require('../models/association.js')
//AÑADIR PET

controller.listData = async (req, res) =>{
  const pets = await Pet.find();
  const asociations = await Association.find();
  res.render('index.hbs', { pets, asociations});
};

module.exports = controller;
