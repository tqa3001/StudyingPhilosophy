const { logEvents } = require('./logger'); // removing "./" causes bug

const errorHandler = (err, req, res, next) => {  // how do you find out that the order is err, req, res, next? 
  logEvents(`${err.name}: ${err.message} | ${req.method}\t${req.url}\t${req.headers.origin}`, 'errors.log');
  console.log(err.stack); // important and helpful
  res.status(res.statusCode ? res.statusCode : 500); // 500: server error 
  res.json({ 'ERROR': err.message });
  next(); 
}

module.exports = errorHandler;