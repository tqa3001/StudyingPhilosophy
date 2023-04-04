const Source = require("../models/Source"); 
const Note = require("../models/Note"); 
const asyncHandler = require("express-async-handler"); 

/**
 * @desc List all notes 
 * @route GET /notes
 * @access private
 */
const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({}); 
  if (!notes?.length) {
    return res.status(400).json({"msg": "No notes found"}); 
  }
  res.status(200).json(notes); 
}); 

/**
 * @desc Create a new note given source and data about the note. 
 * @route POST /notes
 * @access private
 */
const createNote = asyncHandler(async (req, res) => {
  const { sourceID, title, text, noteType } = req.body; 
  if (!sourceID || !title || !noteType) {
    return res.status(400).json({"err": "Invalid input"}); 
  }
  const source = await Source.findById(sourceID); 
  if (!source) {
    return res.status(500).json({"err": "No source with given ID"}); 
  } 
  const newNote = await Note.create({ parentSourceID: sourceID, noteType, title, text }); 
  if (!newNote) {
    return res.status(500).json({"err": "Unable to create new note"}); 
  }
  source.noteIDs.push(newNote._id); 
  const updatedSource = await source.save(); 
  if (!updatedSource) {
    return res.status(500).json({"err": "Unable to create new note"}); 
  }
  res.status(200).json({"success": `Created new note with title ${newNote.title} for source with title ${updatedSource.title}`})
}); 

/**
 * @desc Update a note with id
 * @route PATCH /notes
 * @access Private
 */
const updateNote = asyncHandler(async (req, res) => {
  const { noteID, newParentSourceID, newTitle, newText, newType } = req.body; 
  if (!noteID) {
    return res.status(400).json({"err": "ID of note must not be empty"}); 
  } 
  const note = await Note.findById(noteID); 
  if (!note) {
    return res.status(400).json({"err": "Cannot find a note with the given ID"}); 
  }
  if (newParentSourceID)  
    note.parentSourceID = newParentSourceID; 
  if (newTitle)
    note.title = newTitle; 
  if (newText)
    note.text = newText; 
  if (newType)
    note.type = newType;  
  const updatedNote = await note.save(); 
  if (!updatedNote) {
    return res.status(500).json({"err": "Unable to update note"}); 
  }
  res.return(200).json({"success": `Updated note with ID ${noteID}`})
}); 

/**
 * @desc Delete a note with id
 * @route DELETE /notes
 * @access Private
 */
const deleteNote = asyncHandler(async (req, res) => {
  const { noteID } = req.body; 
  if (!noteID) {
    return res.status(400).json({"err": "ID of note cannot be empty"}); 
  }
  const note = await Note.findById(noteID);
  if (!note) {
    return res.status(400).json({"err": "Cannot find note with the given ID"}); 
  }
  const result = await note.delete();
  if (!result) {
    return res.status(500).json({"err": "Unable to delete note"}); 
  }
  res.status(200).json({"success": `Deleted note with ID ${noteID}`}); 
}); 

module.exports = { getAllNotes, createNote, updateNote, deleteNote }; 