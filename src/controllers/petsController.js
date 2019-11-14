const controller = {};
const Pet = require('../models/Pet.js')

controller.petFilter = async (req, res) =>{
  const type = req.params.type;
  const edadF = [];
  const colorF = [];
  const razaF = [];

  const pets = await Pet.find({'tipo' : type});
  for (var i = 0; i < pets.length; i++) {
    if(!edadF.includes(pets[i].edad)){
      edadF.push(pets[i].edad);
    }
    if(!colorF.includes(pets[i].color)){
      colorF.push(pets[i].color);
    }
    if(!razaF.includes(pets[i].raza)){
      razaF.push(pets[i].raza);
    }
  }

  if(type == "perro"){
    res.render('pets/pet_filter_perro.hbs', {pets, edadF, colorF, razaF});
  }else{
    if(type == "gato"){
      res.render('pets/pet_filter_gato.hbs', {pets, edadF, colorF, razaF});
    }
  }
  //res.render('pets/pet_filter.hbs', { pets, edad, color, raza });
};

controller.filterPerro = async (req, res) =>{
  const edad = req.body.inEdad;
  const raza = req.body.inRaza;
  const color = req.body.inColor;

  var porcionesE = edad.split(',');
  var edadA = [];
  if(porcionesE != ""){
    for (var i = 0; i < porcionesE.length; i++) {
      edadA.push(porcionesE[i]);
    }
  }else{

  }

  var porcionesR = raza.split(',');
  var razaA = [];
  if(porcionesR != ""){
    for (var i = 0; i < porcionesR.length; i++) {
      razaA.push(porcionesR[i]);
    }
  }else{

  }

  var porcionesC = color.split(',');
  var colorA = [];
  if(porcionesC != ""){
    for (var i = 0; i < porcionesC.length; i++) {
      colorA.push(porcionesC[i]);
    }
  }else{

  }


  const edadF = [];
  const colorF = [];
  const razaF = [];
  const type = "perro";
  const petsF = await Pet.find({'tipo' : type});
  for (var i = 0; i < petsF.length; i++) {
    if(!edadF.includes(petsF[i].edad)){
      edadF.push(petsF[i].edad);
    }
    if(!colorF.includes(petsF[i].color)){
      colorF.push(petsF[i].color);
    }
    if(!razaF.includes(petsF[i].raza)){
      razaF.push(petsF[i].raza);
    }
  }



  var query = {};
  var dataload = {"edad":edadA,"raza":razaA,"color":colorA,"tipo":["perro"]};
  if (dataload.tipo && dataload.tipo.length > 0) query.tipo = {$in : dataload.tipo};
  if (dataload.edad && dataload.edad.length > 0) query.edad = {$in : dataload.edad};
  if (dataload.raza && dataload.raza.length > 0) query.raza = {$in : dataload.raza};
  if (dataload.color && dataload.color.length > 0) query.color = {$in : dataload.color};

  console.log(query);
  //var arrayPets = [];
  var pets = await Pet.find(query);
  /*for (var i = 0; i < pets.length; i++) {
    var itemArrayPets = {
      nombre: pets[i].nombre,
      imagen: pets[i].imagen0,
      sexo: pets[i].sexo
    };
    arrayPets.push(itemArrayPets);

  }*/
  //var jsonpets = JSON.stringify({ 'pets': arrayPets } , null, 4);
  //console.log(pets);
  //res.render('pets/pets.hbs', { pets });
  res.send(pets);
  //console.log(query);
  //res.json(pets);
  //console.log(jsonpets);
};
controller.filterGato = async (req, res) =>{
  const edad = req.body.inEdad;
  const raza = req.body.inRaza;
  const color = req.body.inColor;

  var porcionesE = edad.split(',');
  var edadA = [];
  if(porcionesE != ""){
    for (var i = 0; i < porcionesE.length; i++) {
      edadA.push(porcionesE[i]);
    }
  }else{

  }

  var porcionesR = raza.split(',');
  var razaA = [];
  if(porcionesR != ""){
    for (var i = 0; i < porcionesR.length; i++) {
      razaA.push(porcionesR[i]);
    }
  }else{

  }

  var porcionesC = color.split(',');
  var colorA = [];
  if(porcionesC != ""){
    for (var i = 0; i < porcionesC.length; i++) {
      colorA.push(porcionesC[i]);
    }
  }else{

  }


  const edadF = [];
  const colorF = [];
  const razaF = [];
  const type = "gato";
  const petsF = await Pet.find({'tipo' : type});
  for (var i = 0; i < petsF.length; i++) {
    if(!edadF.includes(petsF[i].edad)){
      edadF.push(petsF[i].edad);
    }
    if(!colorF.includes(petsF[i].color)){
      colorF.push(petsF[i].color);
    }
    if(!razaF.includes(petsF[i].raza)){
      razaF.push(petsF[i].raza);
    }
  }



  var query = {};
  var dataload = {"edad":edadA,"raza":razaA,"color":colorA,"tipo":["gato"]};
  if (dataload.tipo && dataload.tipo.length > 0) query.tipo = {$in : dataload.tipo};
  if (dataload.edad && dataload.edad.length > 0) query.edad = {$in : dataload.edad};
  if (dataload.raza && dataload.raza.length > 0) query.raza = {$in : dataload.raza};
  if (dataload.color && dataload.color.length > 0) query.color = {$in : dataload.color};

  console.log(query);
  //var arrayPets = [];
  var pets = await Pet.find(query);
  /*for (var i = 0; i < pets.length; i++) {
    var itemArrayPets = {
      nombre: pets[i].nombre,
      imagen: pets[i].imagen0,
      sexo: pets[i].sexo
    };
    arrayPets.push(itemArrayPets);

  }*/
  //var jsonpets = JSON.stringify({ 'pets': arrayPets } , null, 4);
  //console.log(pets);
  //res.render('pets/pet_filter_gato.hbs', { pets, edadF, colorF, razaF});
  res.send(pets);
  //console.log(query);
  //res.json(pets);
  //console.log(jsonpets);
};
controller.searchText = async (req, res) =>{

     const pets = await Pet.find( { $text: { $search: req.body.insearch } } )

     res.render('search/pets.hbs', { pets });
};



module.exports = controller;
