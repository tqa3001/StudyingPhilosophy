/**
 * Session middleware for implementing authentication
 */
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

// There are more options: https://www.npmjs.com/package/connect-mongodb-session?activeTab=readme
const store = new MongoDBStore({
  uri: process.env.DATABASE_URI,
  collection: "sessions"
}); 

const sessionMiddleware = session({
  cookie: {
    secure: false,  // assign 'true' when website is https
    // domain: 
    maxAge: 5 * 60 * 1000,  // cookie expires after 5 minutes 
  }, 
  /**
   * Note on SameSite attribute: default = none -> dangerous in production
   * this allows cross-origin access of cookies
   * Production: SameSite = lax, secure = true. Read more:
   * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
   */
  saveUninitialized: false, 
  /**
   * New secret: add it to front (otherwise all sessions will be invalidated)
   * Secret requirement: random string. 
   */
  secret: [process.env.SECRET], 
  resave: false,
  store: store
}); 

module.exports = sessionMiddleware
