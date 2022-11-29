const express = require('express'); 
const app = express();

app.get('/', (req, res) => {
  res.json({ 'bruh': 'moment' }); 
}); 

app.listen(6996, () => {
  console.log('fucking app listening on 6996'); 
}); 