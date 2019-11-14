const controller = {};

controller.showView = async (req, res) =>{
  res.render('education/education.hbs');
};

module.exports = controller;
