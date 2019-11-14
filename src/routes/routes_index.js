const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../helpers/auth.js');

const indexController = require('../controllers/indexController.js')
const parejasController = require('../controllers/parejasController.js')
const detailAssociationController = require('../controllers/detailAssociationController.js')
const detailPetController = require('../controllers/detailPetController.js')
const educationController = require('../controllers/educationController.js')
const foroController = require('../controllers/foroController.js')
const loginController = require('../controllers/loginController.js')
const vestimentaController = require('../controllers/vestimentaController.js')
const donativeController = require('../controllers/donativeController.js')
const petsController = require('../controllers/petsController.js')
const matchController = require('../controllers/matchController.js')




//INDEX
router.get('/', indexController.listData);
//PAREJAS
router.get('/Parejas', parejasController.listParejas);
//VESTIMENTA
router.get('/Vestimenta', vestimentaController.listVestimenta);
//FORO
router.get('/Foro', foroController.listForo);
//DETAIL PET
router.get('/detail-pet/:id', detailPetController.showView);
//EDUCATION
router.get('/Education', educationController.showView);
//LOGIN
router.get('/Login', loginController.showView);
//ASSOCIATION
router.get('/detail-asociacion/:id', detailAssociationController.showView);
//DONATIVE
router.get('/donatives', donativeController.indexDonatives);
router.get('/donative/:id', isAuthenticated, donativeController.formDonative);
//PETS
router.get('/pets-filter/:type', petsController.petFilter);
router.post('/pets-filter/filters-perro', petsController.filterPerro);
router.post('/pets-filter/filters-gato', petsController.filterGato);
router.post('/search', petsController.searchText);
router.post('/find-match-perfect', matchController.findPet);
module.exports = router;
