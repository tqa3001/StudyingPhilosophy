const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({
  username: {
    type: String,  // SchemaType
    required: true 
  }, 
  password: {
    type: String,  // SchemaType
    required: true 
  }, 
  // roles: [{
  //   type: String, 
  //   default: "Employee"
  // }], 
  active: {
    type: Boolean, 
    default: true 
  }, 
}); 

// Modularized, time to export. 
module.exports = mongoose.model('User', userSchema); 