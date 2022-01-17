const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  country: { type: String },
  display_name: { type: String },
  followers: { type: String },
  user_type: { type: String },
  user_id: {
    type: String,
    unique: true,
    index: true
  }
});

module.exports = mongoose.model('User', userSchema);