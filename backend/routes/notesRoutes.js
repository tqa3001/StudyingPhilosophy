const router = require("express").Router(); 
const noteControllers = require("../controllers/noteControllers"); 

router.route('/')
  .get(noteControllers.getAllNotes)
  .post(noteControllers.createNote)
  .patch(noteControllers.updateNote)
  .delete(noteControllers.deleteNote)

router.route('/:noteID')
  .get(noteControllers.getTree)

module.exports = router;  