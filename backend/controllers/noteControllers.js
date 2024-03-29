const Source = require("../models/Source"); 
const Note = require("../models/Note"); 
const asyncHandler = require("express-async-handler"); 

/**
 * @desc List all notes 
 * @route GET /notes
 * @access public
 */
const getPublicNotes = asyncHandler(async (req, res) => {
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
  const { sourceID, parentNoteID, noteType, title, text } = req.body; 
  console.log(req.body); 
  if (!sourceID || !title || !noteType) {
    return res.status(400).json({"msg": "Error: Invalid input"}); 
  }
  const source = await Source.findById(sourceID); 
  if (!source) {
    return res.status(500).json({"msg": "Error: No source with given ID"}); 
  } 
  const newNote = await Note.create({ sourceID, parentNoteID, noteType, title, text }); 
  if (!newNote) {
    return res.status(500).json({"msg": "Error: Unable to create new note"}); 
  }
  if (parentNoteID) {
    const parentNote = await Note.findById(parentNoteID); 
    if (!parentNote) 
      return res.status(400).json({"msg": "Error: No parent note exists with that ID"}); 
    parentNote.childNotes.push(newNote._id); 
    const updatedParentNote = await parentNote.save(); 
    if (!updatedParentNote)
      return res.status(500).json({"msg": "Error: Unable to add note to the list of child notes of parent note"});
  } else  {
    source.noteIDs.push(newNote._id); 
  }
  const updatedSource = await source.save(); 
  if (!updatedSource) {
    return res.status(500).json({"msg": "Error: Unable to create new note"}); 
  }
  res.status(200).json({"msg": `Success: Created new note with title ${newNote.title} for source with title ${updatedSource.title}`})
}); 

/**
 * @desc Update a note with id
 * @route PATCH /notes
 * @access Private
 */
const updateNote = asyncHandler(async (req, res) => {
  const { noteID, newParentSourceID, newTitle, newText, newType } = req.body; 
  if (!noteID) {
    return res.status(400).json({"msg": "Error: ID of note must not be empty"}); 
  } 
  const note = await Note.findById(noteID); 
  if (!note) {
    return res.status(400).json({"msg": "Error: Cannot find a note with the given ID"}); 
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
    return res.status(500).json({"msg": "Error: Unable to update note"}); 
  }
  res.return(200).json({"msg": `Success: Updated note with ID ${noteID}`})
}); 

/**
 * @desc Delete a note with id
 * @route DELETE /notes
 * @access Private
 */
const deleteNote = asyncHandler(async (req, res) => {
  const { noteID } = req.body; 
  if (!noteID) {
    return res.status(400).json({"msg": "Error: ID of note cannot be empty"}); 
  }
  const note = await Note.findById(noteID);
  if (!note) {
    return res.status(400).json({"msg": "Error: Cannot find note with the given ID"}); 
  }
  /* Delete note from its source */
  const parentSource = await Source.findById(note.sourceID); 
  if (!parentSource) {
    return res.status(500).json({"msg": "Error: Invalid note with no parentSource"}); 
  }
  const idInSource = parentSource.noteIDs.indexOf(noteID);
  parentSource.noteIDs.splice(idInSource, 1);
  await parentSource.save();
  /**
   * Delete note from its parent note (if exists)
   * This can be optimized: Only delete from the parent of the root of the tree
   * we are deleting. 
   */
  const parentNote = await Note.findById(note.parentNoteID); 
  if (parentNote) {
    const idInParentNote = parentNote.childNotes.indexOf(noteID);
    parentNote.childNotes.splice(idInParentNote, 1);
    await parentNote.save();
  }
  const result = await note.delete();
  if (!result) {
    return res.status(500).json({"msg": "Error: Unable to delete note"}); 
  }
  res.status(200).json({"msg": `Success: Deleted note with ID ${noteID}`}); 
}); 

/**
 * @desc Helper function
 * @param {*} id 
 * @returns 
 */
const traverseTree = async (id) => {  // this function can be further optimized
  const note = await Note.findById(id);
  if (!note) return null; 
  let ret = [note]; 
  for (let next_id in note.childNotes) {
    const ret_next = await traverseTree(next_id); 
    ret = ret.concat(ret_next);
  }
  return ret;
};
/**
 * @desc Get a tree of all notes rooted at note with ID
 * @route GET /notes/noteID
 * @access Private
 */
const getTree = asyncHandler(async (req, res) => {
  const noteID = req.params.noteID;
  const tree = await traverseTree(noteID); 
  if (!tree) 
    return res.status(500).json({"msg": "Error: Unable to query tree"});
  console.log("SADNESS");
  console.log(tree);
  return res.status(200).json(tree); 
}); 

module.exports = { getPublicNotes, getTree, createNote, updateNote, deleteNote }; 