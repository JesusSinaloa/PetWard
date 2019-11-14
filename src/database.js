const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Pets', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false
})
  .then(db => console.log('DB is connected'))
  .catch(err => console.error(err));
