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

// JWT Configure Key
config.JWT_SECRET_KEY = '6e11873b9d9d94a44058bef5747735ce';

module.exports = config;
