/* Schema for thought bubbles */ 
const mongoose = require('mongoose'); 

// Note-to-self: before defining schemas, go back to the specs and think how to best structure the data. 
const sourceSchema = new mongoose.Schema( {  
  parentUserID: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true, 
  },  
  origin: {
    type: String, 
    required: true 
  }, 
  title: {
    type: String,
    required: true 
  }, 
  description: {
    type: String, 
    default: "Add description"
  }, 
  noteIDs: {
    // type: [commentSchema],  // array of subdocuments, not prefered? 
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
    required: false 
  }
}); 

module.exports = mongoose.model('Source', sourceSchema); 