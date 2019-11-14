const controller = {};
const Pet = require('../models/Pet.js')
const User = require('../models/User');
const Couple = require('../models/Couple');
const Message = require('../models/Message');
const Asociation = require('../models/association');
const Donation = require('../models/Donation');
const Adoption = require('../models/Adoption');
const Audition = require('../models/audition');
const paypal = require('paypal-rest-sdk');

controller.showPerfil = async (req, res) =>{
    //FIND IN DB

    const dataUser = await User.findById(req.params.id);

    res.render('dashboard/perfil.hbs', { dataUser, layout: 'dashboard.hbs'});

};
controller.showPerfilAsociation = async (req, res) =>{
    const dataUser = await User.findById(req.params.id);
    const dataAsociacion = await Asociation.find({id_user: dataUser._id});

      if(dataUser.role){
        res.render('dashboard/perfil-asociation.hbs', { dataUser, dataAsociacion, layout: 'dashboard.hbs'});
      }
};
controller.showMessages = async (req, res) =>{
  var idUser = req.params.id;
  const mesages = await Message.find( {"received_by.idUser": idUser} );

  res.render('dashboard/messages.hbs', { mesages, layout: 'dashboard.hbs'});
};
controller.showRegisterPet = async (req, res) =>{
    res.render('dashboard/register-pet.hbs', {layout: 'dashboard.hbs'});
};
controller.showRegisterCouple = async (req, res) =>{
    res.render('dashboard/register-couple.hbs', {layout: 'dashboard.hbs'});
};



controller.registerPet = async (req, res) =>{
  const tipo = req.body.tipo;
  var imagen0 = "";
  var imagen1 = "";
  var imagen2 = "";
  var imagen3 = "";
  //upload images

  const file = req.files.img;
  for(let i = 0; i < file.length; i++){
    switch (i) {
      case 0:
        imagen0 = file[i].name;
        break;
        case 1:
          imagen1 = file[i].name;
          break;
          case 2:
            imagen2 = file[i].name;
            break;
            case 3:
              imagen3 = file[i].name;
              break;
      default:

    }
    file[i].mv('./src/public/images/pets/'+file[i].name);
  }
  //const errors = [];

  if(tipo == "perro"){
    const { tipo, nombre, edad, raza, casta, color, sexo, descripcion, pertenece, anemia, respiratorio, fracturas, lesiones, esterilizado, urinarios, alergias, diabetes, oculares, voz, oido, dental, garrapatas, pulgas, sarna, otros, vacuna1, vacuna2, vacuna3, vacuna4, vacuna5, vacuna6, estado, ciudad, calle, colonia, cp }= req.body;
    const isCouple = 0;
    var adopted = [
      {
        isAdopted: 0,
        date: "",
        byWhat: ""
      }
    ];
    var salud = [{
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
    }];
    var vacunas = [
      {
        vacuna1: vacuna1,
        vacuna2: vacuna2,
        vacuna3: vacuna3,
        vacuna4: vacuna4,
        vacuna5: vacuna5,
        vacuna6: vacuna6
      }
    ];
    var ubicacion = [
      {
        estado: estado,
        ciudad: ciudad,
        calle: calle,
        colonia: colonia,
        cp: cp
      }
    ];
    /*if(!name){
      errors.push({text: 'Por favor introduce el nombre'});
    }
    */
    /*if(errors.length > 0){
      res.render('/register-pet', {
        errors,

      })
    }*/
    var setso = "";
    if(sexo == 1){
      setso = "macho";
    }else{
      if(sexo == 0){
        setso = "hembra";
      }
    }
    const search = nombre+" "+tipo+" "+edad+" "+raza+" "+color+" "+descripcion+" "+setso;
    const newPet = new Pet({ tipo, nombre, edad, raza, casta, color, sexo, descripcion, search, imagen0, imagen1, imagen2, imagen3, pertenece, adopted, isCouple, salud, vacunas, ubicacion });
    await newPet.save();
    const success_msg = "Se Agrego Exitosamente";
    res.render('dashboard/index.hbs', {success_msg, layout: 'dashboard.hbs'});
  }
  else{
    if(tipo == "gato"){
        const { tipo, nombre, edad, raza, color, sexo, descripcion, pertenece, anemia, respiratorio, fracturas, lesiones, esterilizado, urinarios, alergias, diabetes, oculares, voz, oido, dental, garrapatas, pulgas, sarna, otros, vacuna1, vacuna2, vacuna3, vacuna4, vacuna5, vacuna6, estado, ciudad, calle, colonia, cp  }= req.body;
        const isCouple = 0;
        var adopted = [
          {
            isAdopted: 0,
            date: "",
            byWhat: ""
          }
        ];
        var salud = [{
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
        }];
        var vacunas = [
          {
            vacuna1: vacuna1,
            vacuna2: vacuna2,
            vacuna3: vacuna3,
            vacuna4: vacuna4,
            vacuna5: vacuna5,
            vacuna6: vacuna6
          }
        ];
        var ubicacion = [
          {
            estado: estado,
            ciudad: ciudad,
            calle: calle,
            colonia: colonia,
            cp: cp
          }
        ];
        var setso = "";
        if(sexo == 1){
          setso = "macho";
        }else{
          if(sexo == 0){
            setso = "hembra";
          }
        }
        const search = nombre+" "+tipo+" "+edad+" "+raza+" "+color+" "+descripcion+" "+setso;

        const newPet = new Pet({ tipo, nombre, edad, raza, color, sexo, descripcion, search, imagen0, imagen1, imagen2, imagen3, pertenece, adopted, isCouple, salud, vacunas, ubicacion });
        await newPet.save();
        const success_msg = "Se Agrego Exitosamente";
        res.render('dashboard/index.hbs', {success_msg, layout: 'dashboard.hbs'});
    }
  }

};
controller.editImagePerfil = async (req, res) =>{
  const idUser = req.body.idUser;
  const file = req.files.img;
  const image = file.name;
  file.mv('./src/public/images/perfil/'+file.name);


  await User.findByIdAndUpdate(idUser, { image });

  const success_msg = "Se Actualizo La imagen";
  res.render('dashboard/index.hbs', {success_msg, layout: 'dashboard.hbs'});
};

controller.registerCouple = async (req, res) =>{

  const file = req.files.img;
  const imagen0 = file.name;
  file.mv('./src/public/images/couple/'+file.name);

  //const errors = [];

    const { tipo, nombre, apodo, edad, raza, color, sexo, descripcion, pertenece, estado, ciudad, calle, colonia, cp }= req.body;

    var ubicacion = [
      {
        estado: estado,
        ciudad: ciudad,
        calle: calle,
        colonia: colonia,
        cp: cp
      }
    ];
    /*if(!name){
      errors.push({text: 'Por favor introduce el nombre'});
    }
    */
    /*if(errors.length > 0){
      res.render('/register-pet', {
        errors,

      })
    }*/
    const newCouple = new Couple({ tipo, nombre, apodo, edad, raza, color, sexo, descripcion, imagen0, pertenece, ubicacion });
    await newCouple.save();
    const success_msg = "Se Agrego Exitosamente";
    res.render('dashboard/index.hbs', {success_msg, layout: 'dashboard.hbs'});
};
controller.deleteMessage = async (req, res) =>{
  await Message.findByIdAndDelete(req.params.id);
  const success_msg = "Se Borro Exitosamente";
  res.render('dashboard/index.hbs', {success_msg, layout: 'dashboard.hbs'});

};
controller.detailMessage = async (req, res) =>{
  var idMessage = req.params.id;
  const message = await Message.findById(idMessage);
  //actualizar estado
  if (!message.isRead) {
    const isRead = true;
    await Message.findByIdAndUpdate(idMessage, {isRead});
  }
  const idPet = message.pet[0].idPet;

  if(message.asunto == "Adopcion"){

    var pet = await Pet.findById(idPet);
  }else{
    var pet = await Couple.findById(idPet);
    var banderaCouple = true;
  }
  var arrayProccess = [];
  if(banderaCouple){
      arrayProccess = [];
  }else{
    var solicitud = false;
    var conclusion = false;
    var adopted = false;

  const proccess = pet.adopted[0];
   switch (proccess.proccess) {
     case "0":
        console.log("Ingresado");
         solicitud = true;
         conclusion = false;
         adopted = false;
       break;
       case "1":
          console.log("Esperando reunion");
           solicitud = false;
           conclusion = true;
           adopted = false;

         break;
         case "2":
            console.log("Se adopto");
            solicitud = false;
            conclusion = false;
            adopted = true;
           break;

     default:
   }

    arrayProccess = [
     {
       solicitud: solicitud,
       conclusion: conclusion,
       adopted: adopted
     }
   ];

  }


  res.render('dashboard/detail-message.hbs', { message, pet, arrayProccess, layout: 'dashboard.hbs'});
};

controller.sendResponse = async (req, res) =>{
  const idMessage = req.body.id_message;
  const text = req.body.message;
  //CONSULTO MENSAJE
  const objMessage = await Message.findById(idMessage);


  const send_by = [
    {
      idUser: objMessage.received_by[0].idUser,
      nameUser: objMessage.received_by[0].nameUser
    }
  ];
  const received_by = [
    {
      idUser: objMessage.send_by[0].idUser,
      nameUser: objMessage.send_by[0].nameUser
    }
  ];
  const pet = [
    {
      idPet: objMessage.pet[0].idPet,
      namePet: objMessage.pet[0].namePet,
      pertenece: objMessage.pet[0].pertenece
    }
  ];

  const asunto = objMessage.asunto;

  const newMessage = new Message({ send_by, received_by, pet, text, asunto});
  await newMessage.save();
  const success_msg = "Se Envio Exitosamente";
  res.render('dashboard/index.hbs', {success_msg, layout: 'dashboard.hbs'});
};

controller.myPets = async (req, res) =>{
  const idUser = req.params.id;
  //const pets = await Pet.find({pertenece: req.params.id});
  //res.render('dashboard/pets.hbs', { pets, layout: 'dashboard.hbs'});
  res.render('dashboard/type-pet.hbs', { idUser, layout: 'dashboard.hbs'});
};
controller.myPetsAdoption = async (req, res) =>{
  const pets = await Pet.find({pertenece: req.params.id});
  res.render('dashboard/pets.hbs', { pets, layout: 'dashboard.hbs'});

};
controller.myPetsCouple = async (req, res) =>{
  const pets = await Couple.find({pertenece: req.params.id});
  res.render('dashboard/couples.hbs', { pets, layout: 'dashboard.hbs'});

};
controller.donations = async (req, res) =>{
const asociaciones = await Asociation.findOne({id_user: req.params.id});
const donations = await Donation.find({id_asociacion: asociaciones._id});

res.render('dashboard/donations.hbs', { donations, layout: 'dashboard.hbs'});
};
controller.detailDonative = async (req, res) =>{

const donative = await Donation.findById(req.params.id);

res.render('dashboard/detail-donative.hbs', { donative, layout: 'dashboard.hbs'});
};

controller.deletePet = async (req, res) =>{
  await Pet.findByIdAndDelete(req.params.id);
  const success_msg = "Se Elimino Exitosamente";
  res.render('dashboard/index.hbs', {success_msg, layout: 'dashboard.hbs'});
};
controller.deleteCouple = async (req, res) =>{
  await Couple.findByIdAndDelete(req.params.id);
  const success_msg = "Se Elimino Exitosamente";
  res.render('dashboard/index.hbs', {success_msg, layout: 'dashboard.hbs'});
};
controller.editPet = async (req, res) =>{
  const pet = await Pet.findById(req.params.id);
  res.render('dashboard/edit-pet.hbs', { pet, layout: 'dashboard.hbs'});

};
controller.editCouple = async (req, res) =>{
  const pet = await Couple.findById(req.params.id);
  res.render('dashboard/edit-couple.hbs', { pet, layout: 'dashboard.hbs'});

};

controller.editStatusAdopted = async (req, res) =>{
  var success_msg = "";
  const message = await Message.findById(req.body.idMessage);
  const idPet = message.pet[0].idPet;
  const pet = await Pet.findById(idPet);

  if(req.body.proccess == "0"){
    const adopted = [
      {
        isAdopted: false,
        date: "",
        byWhat: "",
        proccess: "1"
      }
    ];

      await Pet.findByIdAndUpdate(idPet, { adopted });
      success_msg = 'En hora buena, ahora acuerda una reunión para recoger a la mascota, cuando la hayas recogido ingresa a tu ultimo mensaje o a la seccion de adopciones y da click en "Ya tengo la mascota" para poder concluir con el proceso';
  }else{
    if(req.body.proccess == "1"){
      var datetime = new Date();
      const adopted = [
        {
          isAdopted: true,
          date: datetime,
          byWhat: req.body.idUser,
          proccess: "2"
        }
      ];
        //SAVE IN DB ADOPTION
        const byWhat = req.body.idUser;
        const whose = pet.pertenece;
        const newAdoption = new Adoption({ idPet, byWhat, whose });
        await newAdoption.save();
        await Pet.findByIdAndUpdate(idPet, { adopted });
        success_msg = 'Que bueno que hayas adoptado, ahora queda en ti ser feliz con un gran amigo.';
    }
  }
  res.render('dashboard/index.hbs', {success_msg, layout: 'dashboard.hbs'});
};
controller.adoptions = async (req, res) =>{
  const idUser = req.params.id;
  res.render('dashboard/select-type-adoption.hbs', {idUser, layout: 'dashboard.hbs'});
};

controller.myAdoptions = async (req, res) =>{
  const idUser = req.params.id;
  const adoptions = await Adoption.find({ byWhat: idUser});
  var arrayPet = [];

  adoptions.forEach( async function (arrayItem) {
    var pet = await Pet.findById(arrayItem.idPet);

    arrayPet.push(pet);

  });

  res.render('dashboard/my-adoptions.hbs', {arrayPet, layout: 'dashboard.hbs'});
};
controller.giveAdoptions = async (req, res) =>{
  const idUser = req.params.id;
  const adoptions = await Adoption.find({ whose: idUser});
  var arrayPet = [];

  adoptions.forEach( async function (arrayItem) {
    var pet = await Pet.findById(arrayItem.idPet);

    arrayPet.push(pet);

  });

  res.render('dashboard/give-adoptions.hbs', {arrayPet, layout: 'dashboard.hbs'});
};
controller.detailMyAdoptions = async (req, res) =>{
  const pet = await Pet.findById(req.params.id);
  const adoption = await Adoption.find({idPet: req.params.id});
  const byWhat = await User.findById(adoption[0].byWhat);
  const whose = await User.findById(adoption[0].whose);

  res.render('dashboard/detail-my-adoption.hbs', {pet, adoption, byWhat, whose, layout: 'dashboard.hbs'});
};


controller.auditarPet = async (req, res) =>{

    const message = await Message.findById(req.params.id);
    //console.log(message.send_by[0].idUser);
    //console.log(message.received_by[0].idUser);
    //console.log(message.pet[0].idPet);
    const precio = 250.00;

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
          "return_url": "http://localhost:3000/success/asociation-pay/"+message.send_by[0].idUser+"/"+message.received_by[0].idUser+"/"+message.pet[0].idPet,
          "cancel_url": "http://localhost:3000/cancel/asociation-pay"
      },
      "transactions": [{
          "item_list": {
              "items": [{
                  "name": "Pago de Auditoria",
                  "sku": "002",
                  "price": "250.00",
                  "currency": "MXN",
                  "quantity": 1
              }]
          },
          "amount": {
              "currency": "MXN",
              "total": "250.00"
          },
          "description": "Pago de auditoria para mascota o usuario"
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
  //res.render('dashboard/detail-my-adoption.hbs', {pet, adoption, byWhat, whose, layout: 'dashboard.hbs'});
};

controller.showAuditions = async (req, res) =>{
     const auditions = await Audition.find({idUser: req.params.id});

     res.render('dashboard/auditions.hbs', { auditions, layout: 'dashboard.hbs'});
};
controller.viewAudition = async (req, res) =>{
     const audition = await Audition.findById(req.params.id);
     const pet = await Pet.findById(audition.data[0].idPet);
     const userPay = await User.findById(audition.idUser);
     const userTo = await User.findById(audition.data[0].received_by);

     res.render('dashboard/detail-audition.hbs', { audition, pet, userTo, userPay, layout: 'dashboard.hbs'});
};





module.exports = controller;
