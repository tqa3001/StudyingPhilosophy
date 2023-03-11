const router = require("express").Router(); 
const sourceControllers = require("../controllers/sourceControllers")

router.route('/')
  .get(sourceControllers.getAllSources)
  .post(sourceControllers.createSourceAndUpdate); 

router.route('/:userID')
  .get(sourceControllers.getSourcesFromUserID);

module.exports = router