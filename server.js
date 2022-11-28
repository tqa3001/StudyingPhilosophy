const express = require('express'); 
const app = express(); 
const PORT = 3000; 

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`); 
}); 