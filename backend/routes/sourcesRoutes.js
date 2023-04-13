const router = require("express").Router(); 
const sourceControllers = require("../controllers/sourceControllers");
const { authorize } = require("../controllers/authControllers");

router.route('/')
  .get(sourceControllers.getPublicSources)
  .post(authorize, sourceControllers.createSourceAndUpdate)
  .patch(authorize, sourceControllers.updateSource)
  .delete(authorize, sourceControllers.deleteSource);

router.route('/:userID')
  .get(authorize, sourceControllers.getSourcesFromUserID);

module.exports = router