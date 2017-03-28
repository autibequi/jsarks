const Promise = require('bluebird');

module.exports.checkValidations = (validations) => {
  if (!validations.isEmpty()) {
    return Promise.reject({ status: 400, errors: validations.array() });
  }
  return validations;
};

module.exports.getToken = (req) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
};
