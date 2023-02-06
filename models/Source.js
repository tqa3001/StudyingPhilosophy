/* Schema for thought bubbles */ 
const mongoose = require('mongoose'); 

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
  comments: {
    // type: [commentSchema],  // array of subdocuments, not prefered? 
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    required: false 
  }
}); 

module.exports = mongoose.model('Bubble', bubbleSchema); 