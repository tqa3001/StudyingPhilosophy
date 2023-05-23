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
const { logEvents } = require("../middleware/logger");
const Source = require("../models/Source");

const authenticate = asyncHandler(async (req, res) => {
  const { username, password } = req.body; 
  console.log("gamin???", username, password, req.body);
  if (!username || !password) {
    return res.status(400).json({"msg": "Error: Bad login request"}); 
  }
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(500).json({"msg": "Error: Internal server error"});
  }
  const correctPassword = await bcrypt.compare(password, user.password); 
  if (correctPassword) {
    req.session.userID = user._id;
    res.status(200).json({
      "msg": `Success: Logged in as ${user.username}`,
      "sessionID": req.sessionID,
      "userID": user._id
    });
  } else {
    res.status(401).json({"msg": "Error: Incorrect username or password"}); 
  }
}); 

const isAdmin = async (userID) => {
  const user = await User.findById(userID);
  return user && user.isAdmin;
}

/* If request needs authorization, add parameter :userID */
const authorize = asyncHandler(async (req, res, next) => {  
  const sessionID = req.sessionID; 
  const sessionUserID = String(req.session.userID);
  let reqUserID = req.params.userID;
  const userIsAdmin = await isAdmin(reqUserID);
  if ((!sessionUserID || reqUserID !== sessionUserID) && !userIsAdmin) {
    logEvents(`Unauthorized access: ${req.url} | ${req.method} | ${req.header.origins} | 
      SessionID: ${sessionID}`, 
      "errors.log"); 
    return res.status(401).json({"msg": "Unauthorized access."}); 
  }
  next(); 
});

const logout = asyncHandler(async (req, res) => {
  req.session.destroy();
  res.status(200).json({"msg": "Successfully logged out"});
});

module.exports = { authenticate, authorize, logout }