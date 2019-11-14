const express = require('express');
const router = express.Router();
const adoptController = require('../controllers/adoptController.js')


//SEND MESSAGE
router.get('/send-message/to-adopt/:id/:user', adoptController.sendMessage);

module.exports = router;
