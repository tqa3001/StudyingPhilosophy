const router = require('express').Router();
const userControllers = require('../controllers/userControllers'); 
const { authorize } = require("../controllers/authControllers"); 

router.route('/')
  .get(userControllers.getAllUsers)
  .post(userControllers.createUser)
  .patch(authorize, userControllers.updateUser)
  .delete(authorize, userControllers.deleteUser); 

module.exports = router;
  