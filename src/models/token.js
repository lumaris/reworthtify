const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
  },
  type: {
    type: String,
  },
  expire: { type: Date },

},
  { 
    versionKey: false
  }
);
module.exports = mongoose.model('tokens', tokenSchema);