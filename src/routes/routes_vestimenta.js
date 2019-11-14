const express = require('express');
const router = express.Router();
const vestimentaController = require('../controllers/vestimentaController.js')


//DETAIL CLOTHE
router.get('/detail-vestimenta', vestimentaController.showDetailVestimenta);

module.exports = router;
