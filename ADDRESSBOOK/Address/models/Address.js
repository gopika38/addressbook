// models/Address.js

const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  }
}, { collection:'address' }); 

const Address = mongoose.model('Address', AddressSchema);

module.exports = Address;
