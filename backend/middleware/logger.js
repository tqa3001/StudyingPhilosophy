// Destructuring variables
const { format } = require('date-fns'); 
const { v4: uuid } = require('uuid'); 
const fs = require('fs'); 
const fsPromises = require('fs').promises; 
const path = require('path'); 

// generate logging function that can be used anywhere
const logEvents = async (message, logFileName) => { // Question: why do we need functions to be async?
  const entry = `${Date()}\t${uuid()} | ${message} \n`; 
  try {
    const folderPath = path.join(__dirname, '..', 'logs');  
    if (!fs.existsSync(folderPath)) {
      await fsPromises.mkdir(folderPath);
    }
    await fsPromises.appendFile(path.join(folderPath, logFileName), entry); 
  } catch (err) {
    console.log('Error: ', err); 
  }
}; 

// logger middleware
const logger = (req, res, next) => {
  // This one gets full very quickly so maybe you should add a filter 
  logEvents(`${req.method} | ${req.url} | ${req.headers.origin} `, 'requests.log'); 
  console.log(`${req.method} | ${req.path} | Session: ${JSON.stringify(req.session)}`);
  next(); 
}

// Don't forget to export 
module.exports = { logEvents, logger }; 