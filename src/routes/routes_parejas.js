const express = require('express');
const router = express.Router();
const parejasController = require('../controllers/parejasController.js')

//DETAIL COUPLE
router.get('/detail-couple/:id', parejasController.showDetailCouple);
//RETURN COUPLE
router.get('/return-couples', parejasController.showReturnCouple);
router.post('/send-message/to-couple', parejasController.sendMessage);
module.exports = router;
