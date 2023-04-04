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
const mongoose = require('mongoose'); 

// connect to database
mongoose.connect(process.env.DATABASE_URI) 
  .then((data) => { console.log('successfully connected to DB')}) 
  .catch((reason) => { console.log(reason); })

// make static assets public
app.use('/', express.static(path.join(__dirname, '/public')));  

// log all requests
app.use(logger); 

// parsers
app.use(cookieParser()); 
app.use(express.json()); 

// app.use(cors()); // -> public API, any origin can request resources
app.use(cors(corsOptions)); 

// API landing page 
app.get('/', require('./routes/root'));

// users
app.use('/users', require('./routes/usersRoutes'));

// sources
app.use('/sources', require('./routes/sourcesRoutes')); 

// notes
app.use('/notes', require('./routes/notesRoutes')); 

// 404 
// question: what is the purpose of checking "accepts"? what would go wrong if we don't do so? 
// technically we can render the full UI serverside, but that's too slow we don't want that. 
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