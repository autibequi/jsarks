// Custom Modules
const mongoose = require('./db.js');

// Setup
const Schema = mongoose.Schema;

// Define ShortURl Model
module.exports = mongoose.model('Bookmark',
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  });
