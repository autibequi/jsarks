const config = {};

// Set mongoURL
if (process.env.MONGO_URL) {
  config.mongoUrl = process.env.MONGO_URL;
} else {
  config.mongoUrl = 'localhost';
}

// Set mongoDatabase
if (process.env.NODE_ENV === 'test') {
  config.mongoDatabase = 'test';
} else {
  config.mongoDatabase = 'prod';
}

module.exports = config;
