const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 40,
  },
  adress: {
    type: String,
    trim: true,
    maxlength: 80,
  },
  email: {
    type: String,
    trim: true,
  },
  phoneNumber: {
    type:Number,
  },

});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;