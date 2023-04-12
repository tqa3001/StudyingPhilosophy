const mongoose = require('mongoose'); 
/**
 * noteType: 
 * citation
 * elaboration
 * question / resolved question
 * answer
 * observation
 */

const noteSchema = new mongoose.Schema({
  sourceID: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Source', 
    required: true 
  }, 
  parentNoteID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note'
  },
  childNotes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
    default: []
  },
  noteType: String,
  title: String,
  text: {
    type: String, 
    required: true 
  }
}, { timestamps: true }); // second POJO: options. timestamps = true -> auto add createdAt, updatedAt 

module.exports = mongoose.model('Note', noteSchema); 
