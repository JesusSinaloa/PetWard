const controller = {};
const Pet = require('../models/Pet.js')

controller.listVestimenta = async (req, res) =>{
  const pets = await Pet.find();
  res.render('vestimenta/vestimenta.hbs', { pets });
};
controller.showDetailVestimenta = async (req, res) =>{
  res.render('vestimenta/detail-vestimenta.hbs');
};


module.exports = controller;
