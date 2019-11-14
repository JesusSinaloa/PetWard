const controller = {};
const Pet = require('../models/Pet.js')

controller.listForo = async (req, res) =>{
  const pets = await Pet.find();
  res.render('foro/foro.hbs', { pets });
};



module.exports = controller;
