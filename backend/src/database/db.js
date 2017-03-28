// Modules
const mongoose = require('mongoose');
const config = require('../config.js');

// Set Bluebird as default promise library for mogoose
mongoose.Promise = require('bluebird');

// Connects to Database
mongoose.connect(`mongodb://${config.mongoUrl}/${config.mongoDatabase}`);

module.exports = mongoose;
