const Promise = require('bluebird');

module.exports.checkValidations = (validations) => {
  if (!validations.isEmpty()) {
    return Promise.reject({ status: 400, errors: validations.array() });
  }
  return validations;
};
