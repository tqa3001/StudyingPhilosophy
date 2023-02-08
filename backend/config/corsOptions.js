const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {  // some devices -> no origins (security threat?)
      callback(null, true); 
    } else {
      callback(new Error('CORS forbids access')); 
    }
  }, 
  credentials: true,  // set Access-Control-Allow-Headers
  optionsSuccessStatus: 200  // instead of 204
}; 

module.exports = corsOptions; 
