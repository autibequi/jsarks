// Custom Modules
const mongoose = require('./db.js');

// Define ShortURl Model
module.exports = mongoose.model('User',
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    admin: {
      type: Boolean,
      required: true,
    },
  });
