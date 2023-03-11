const router = require("express").Router(); 
const sourceControllers = require("../controllers/sourceControllers")

router.route('/')
  .get(sourceControllers.getAllSources)
  .post(sourceControllers.createSourceAndUpdate)
  .patch(sourceControllers.updateSource)
  .delete(sourceControllers.deleteSource)

router.route('/:userID')
  .get(sourceControllers.getSourcesFromUserID);

module.exports = router