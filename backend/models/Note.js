const mongoose = require('mongoose'); 
const AutoIncrement = require('mongoose-sequence')(mongoose);

const commentSchema = new mongoose.Schema({
  text: {
    type: String, 
    required: true 
  }
}, { timestamps: true }); // second POJO: options. timestamps = true -> auto add createdAt, updatedAt 

module.exports = mongoose.model('Note', commentSchema); 
