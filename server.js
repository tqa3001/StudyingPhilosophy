require('dotenv').config(); 
const express = require('express'); 
const app = express(); 
const path = require('path'); 
const { logger } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler'); 
const cookieParser = require('cookie-parser'); 
const cors = require('cors'); 
const corsOptions = require('./config/corsOptions');
const PORT = process.env.PORT || 6996;

// make static assets public
app.use('/', express.static(path.join(__dirname, '/public')));  

// log all requests
app.use(logger); 

// allow us to parse cookies
app.use(cookieParser()); 

// app.use(cors()); // -> public API,   any origin can request resources
app.use(cors(corsOptions)); 

// landing page
app.get('/', require('./routes/root.js'));

// 404 
// question: what is the purpose of checking "accepts"? what would go wrong if we don't do so? 
app.all('*', (req, res) => {
  res.status(404); 
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html')); 
  } else if (req.accepts('json')) {
    res.json({ 'Error': '404 Not Found' }); 
  } else {
    res.type('text').send('404 Not Found');  
  }
});

// Error handling middleware 
app.use(errorHandler); // middlewares are applied from top to bottom 

// Listen
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`); 
}); 