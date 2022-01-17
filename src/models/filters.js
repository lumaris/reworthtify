const mongoose = require('mongoose');

const filtersSchema = new mongoose.Schema({
  term: {
    type: String,
  },
  path: {
    type: String,
  },
  filter: {
    type: String,
  },
  search_num: { type: Number },

},
  { 
    versionKey: false
  }
);
filtersSchema.index({ term: 'text', path: 'text', filter: 'text' }, { unique: true });
module.exports = mongoose.model('Filters', filtersSchema);