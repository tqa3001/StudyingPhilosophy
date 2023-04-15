const router = require("express").Router();
const authControllers = require("../controllers/authControllers"); 
const loginLimiter = require("../middleware/rateLimiter");

router.route('/') // syntax reminder: app.use(), router.route()
  .post(loginLimiter, authControllers.authenticate)

module.exports = router; 