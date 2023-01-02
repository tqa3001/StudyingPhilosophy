/* Schema for thought bubbles */ 
const mongoose = require('mongoose'); 
const commentSchema = require('./Comment'); 

// Note-to-self: before defining schemas, go back to the specs and think how to best structure the data. 
const bubbleSchema = new mongoose.Schema( {  
  author: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true, 
  },  
  url: {
    type: String,
    required: true 
  }, 
  description: {
    type: String, 
    default: "Add description"
  }, 
  comments: [commentSchema] // array of subdocuments
}); 

module.exports = mongoose.model('Bubble', bubbleSchema); 