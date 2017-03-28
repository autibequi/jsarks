const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// Set mongoURL
let mongoUrl;
if (process.env.MONGO_URL) {
  mongoUrl = process.env.MONGO_URL;
} else {
  mongoUrl = 'localhost';
}

// Connects to Database
mongoose.connect(`mongodb://${mongoUrl}/jshort`);

module.exports = mongoose;
