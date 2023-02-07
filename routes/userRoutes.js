const router = require('express').Router();
const userControllers = require('../controllers/userControllers'); 

router.route('/')
  .get(userControllers.getAllUsers)
  .post(userControllers.createUser)
  .patch(userControllers.updateUser)
  .delete(userControllers.deleteUser); 

module.exports = router;
  