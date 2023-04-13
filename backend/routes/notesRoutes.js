const router = require("express").Router(); 
const noteControllers = require("../controllers/noteControllers"); 
const { authorize } = require("../controllers/authControllers"); 

router.route('/')
  .get(noteControllers.getPublicNotes)
  .post(authorize, noteControllers.createNote)
  .patch(authorize, noteControllers.updateNote)
  .delete(authorize, noteControllers.deleteNote)

router.route('/:noteID')
  .get(authorize, noteControllers.getTree)

module.exports = router;  