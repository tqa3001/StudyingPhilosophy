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
  isAdmin: {
    type: Boolean, 
    default: false 
  }, 
  active: {
    type: Boolean, 
    default: true 
  }, 
  sources: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Source' }], 
    default: [], 
  }
}, { timestamps: true }); 

// Modularized, time to export. 
module.exports = mongoose.model('User', userSchema); 