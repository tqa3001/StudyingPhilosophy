/**
 * Controllers for user authentication
 * 
 * Two options:
 * 1. JWT
 * 2. express-session + connect-mongo
 * 
 * At first I thought I would use jwt but after reading about its pros and cons, 
 * I decided that good ol' session tokens to DB + Cookies is more secure.
 * JWT -> hard to revoke/invalidate/update + oftentimes app wont be stateless + large size
 * But JWT -> simple + no need for session management 
 * 
 * A very good read: https://redis.com/blog/json-web-tokens-jwt-are-dangerous-for-user-sessions/
 */
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt");
const User = require("../models/User"); 

const authenticate = asyncHandler(async (req, res) => {
  const { username, password } = req.body; 
  if (!username || !password) {
    return res.status(400).json({"err": "bad login request"}); 
  }
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(500).json({"err": "internal server error"});
  }
  const correctPassword = await bcrypt.compare(password, user.password); 
  if (correctPassword) {
    req.session.userID = user._id;
    res.status(200).json({"success": "User login success"});
  } else {
    res.status(401).json({"err": "Incorrect username or password"}); 
  }
}); 

module.exports = { authenticate }