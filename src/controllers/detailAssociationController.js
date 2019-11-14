const controller = {};
const Association = require('../models/association.js')
controller.showView = async (req, res) =>{

    const asociation = await Association.findById(req.params.id);
    res.render('associations/detail-association.hbs', { asociation });
};

module.exports = controller;
