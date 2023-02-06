const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({
  username: {
    type: String,  // SchemaType
    required: true 
  }, 
  password: {
    type: String,  
    required: true 
  }, 
  active: {
    type: Boolean, 
    default: true 
  }, 
  sources: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Source' }], 
    default: [], 
  }
}); 

// Modularized, time to export. 
module.exports = mongoose.model('User', userSchema); 