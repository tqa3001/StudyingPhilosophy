const { logEvents } = require('./logger'); // removing "./" causes bug

const errorHandler = (req, res, err, next) => {
  logEvents(`${err.name}: ${err.message} | ${req.method}\t${req.url}\t${req.headers.origin}`, 'errors.log');
  res.status(res.statusCode ? res.statusCode : 500); // 500: server error 
  res.json({ 'ERROR': err.message });
  next(); 
}

module.exports = errorHandler;