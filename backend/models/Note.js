const mongoose = require('mongoose'); 
const AutoIncrement = require('mongoose-sequence')(mongoose);

/**
 * noteType: 
 * 0 - Citation
 * 1 - Elaboration
 * 2 - Question
 * 3 - Answer
 * 4 - Observation
 */

const noteSchema = new mongoose.Schema({
  parentSourceID: {
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
  noteType: Number, 
  title: String,
  text: {
    type: String, 
    required: true 
  }
}, { timestamps: true }); // second POJO: options. timestamps = true -> auto add createdAt, updatedAt 

module.exports = mongoose.model('Note', noteSchema); 
