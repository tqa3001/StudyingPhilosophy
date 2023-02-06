const mongoose = require('mongoose'); 

function extend(schema, options) {
  let schemaCopy = Object.assign(new mongoose.Schema, schema); 
  return schemaCopy
}

let cockSchema = mongoose.Schema({
  cockLength: Number 
}); 

extend(cockSchema); 

// let Cock = mongoose.model('Cock', cockSchema); 


