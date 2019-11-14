const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController.js')
const passport = require('passport');
const { isAuthenticated } = require('../helpers/auth.js');

//LOGIN-DASH
router.get('/show-dashboard', isAuthenticated, loginController.showDash);
//REGISTER
router.get('/Register', loginController.register);
//REGISTRAR USUARIO
router.post('/Register/add-user', loginController.addUser);
//INICIAR SESSION
router.post('/Login/authentification', passport.authenticate('local',{

  successRedirect: '/',
  failureRedirect: '/Login',
  failureFlash: true
}));

router.get('/Login/logout', loginController.logout);
router.get('/Register/Asociation', loginController.registerAsociation);
router.post('/Register/add-asociation', loginController.addAsociation);
module.exports = router;
