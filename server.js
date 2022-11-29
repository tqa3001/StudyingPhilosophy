const express = require('express'); 
const app = express(); 
const path = require('path'); 
const { logger } = require('./middleware/logger')
const PORT = process.env.PORT || 3000; 

app.use('/', express.static(path.join(__dirname, '/public'))); 

app.use(logger); // Log all routes 

app.get('/', require('./routes/root.js'));

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

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`); 
}); 