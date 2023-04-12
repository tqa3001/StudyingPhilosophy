const rateLimit = require("express-rate-limit");
const { logEvent } = require("./logger"); 

const limiter = rateLimit({
  windowMs: 60 * 1000, // Window length
  max: 5, // Max number of request per window
  standardHeaders: true, 
	legacyHeaders: false, 
  message: "Rate limit exceeded", 
  /**
   * Rate limit exceed -> must be logged
   * Note: logEvent is async but we don't need to wait (save time).
   */
  handler: (req, res, next) => {  
    // note: process.cwd() => the directory you run node, __dirname => the directory of THIS script
    logEvent(`Rate limit exceeded: ${req.method} | ${req.url} | ${req.headers.origin}`, "errors.log"); 
    res.json({"err": "Rate limit exceeded"})  // not sure what the status code should be
  }
}); 

module.exports = limiter;