const controller = {};
const User = require('../models/User');
const Asociation = require('../models/association');
const passport = require('passport');

controller.showView = async (req, res) =>{
    res.render('login/login.hbs');
};
controller.showDash = async (req, res) =>{
    res.render('dashboard/index.hbs', {layout: 'dashboard.hbs'});
};
controller.register = async (req, res) =>{
    res.render('register/register.hbs');
};
controller.registerAsociation = async (req, res) =>{
    res.render('register/asociation.hbs');
};
controller.logout = async (req, res) =>{
  req.logout();
  res.redirect('/')
}


controller.addUser = async (req, res) =>{
  const{ nombre, apellidos, password, confirmpass, sexo, email, estado, telefono, ciudad } = req.body;
  const errors = [];
  if(nombre.length <= 0){
    errors.push({text: 'Inserte su nombre'})
  }
  if(apellidos.length <= 0){
    errors.push({text: 'Inserte sus apellidos'})
  }
  if (password != confirmpass) {
    errors.push({text: 'El password no coincide'})
  }
  if(errors.length > 0){
    res.render('register/register.hbs', {errors, nombre, apellidos, password, confirmpass, sexo, email, telefono, estado, ciudad});

  }else{
    const emailUser = await User.findOne({email: email});
    if (emailUser) {
      req.flash('error_msg', 'El email ya esta en uso.');
      res.redirect('/Register');

    }else{
    const image = "";
    const role = false;
    const newUser = new User({nombre, apellidos, password, sexo, email, telefono, estado, ciudad, image, role})
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    req.flash('success_msg', 'Registro exitoso.')
    res.redirect('/Login');
    }
  }

};
controller.addAsociation = async (req, res) =>{
  //Upload Images
  var imagen0 = "";
  var imagen1 = "";
  var imagen2 = "";
  var imagen3 = "";
  var imagen4 = "";
  var imagen5 = "";
  var imagen6 = "";
  var imagen7 = "";
  var imagen8 = "";
  var logo_img = "";
  var video0 = "";
  var video1 = "";
  var video3 = "";

  const logo = req.files.logo;
  const file = req.files.images;
  const videos = req.files.videos;
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
              case 4:
                imagen4 = file[i].name;
                break;
                case 5:
                  imagen5 = file[i].name;
                  break;
                  case 6:
                    imagen6 = file[i].name;
                    break;
                    case 7:
                      imagen7 = file[i].name;
                      break;
      default:

    }
    file[i].mv('./src/public/images/demo_asociation/'+file[i].name);
  }
  //Upload Videos
  for(let i = 0; i < videos.length; i++){
    switch (i) {
      case 0:
        video0 = videos[i].name;
        break;
        case 1:
          video1 = videos[i].name;
          break;
          case 2:
            video2 = videos[i].name;
            break;
      default:

    }
    videos[i].mv('./src/public/videos/asociation/'+videos[i].name);
  }
  //Upload Logo
  logo_img = logo.name;
  logo.mv('./src/public/images/asociaciones/'+logo_img);
  logo.mv('./src/public/images/profile_image/'+logo_img);
  const { nombre, password, confirmpass, email, telefono, estado, ciudad, calle, colonia, cp, facebook, instagram, twitter, google, alojadas, donativos, rescates, meritos, cuenta, descripcion }= req.body;
  var social = [
    {
      facebook: facebook,
      instagram: instagram,
      twitter: twitter,
      google: google
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

  const errors = [];
  if (password != confirmpass) {
    errors.push({text: 'El password no coincide'})
  }
  if(errors.length > 0){
    res.render('Register/Asociation.hbs', {errors, nombre, password, confirmpass, email, telefono, estado, ciudad, calle, colonia, cp, facebook, instagram, twitter, google, alojadas, donativos, rescates, meritos, cuenta, descripcion});

  }else{
    const emailUser = await User.findOne({email: email});
    if (emailUser) {
      req.flash('error_msg', 'El email ya esta en uso.');
      res.redirect('/Register/add-asociation');
    }else{

    const role = true;
    const image = logo_img;
    const newUser = new User({nombre, password, email, telefono, estado, ciudad, image, role})
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    const id_user = newUser._id;
    console.log(id_user);
    const newAsociation = new Asociation({nombre, id_user, logo_img, email, telefono, imagen0, imagen1, imagen2, imagen3, imagen4, imagen5, imagen6, imagen7, video0, video1, video2, ubicacion, social, alojadas, donativos, rescates, meritos, cuenta, descripcion });
    await newAsociation.save();
    req.flash('success_msg', 'Registro exitoso.')
    res.redirect('/Login');
    }
  }

};
module.exports = controller;
