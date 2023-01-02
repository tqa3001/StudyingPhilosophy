const mongoose = require('mongoose'); 

const commentSchema = new mongoose.Schema({
  text: {
    type: String, 
    required: true 
  } 
}); 

module.exports = mongoose.model('Comment', commentSchema); 
