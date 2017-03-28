// Modules
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Custom Modules
const User = require('../database/user.js');
const Utils = require('../utils.js');
const Config = require('../config.js');

// Setup
const router = express.Router();

// Create user
router.post('/login', (req, res) => {
  req.checkBody('username', 'password', 'Must not be empty').notEmpty();
  req.checkBody('username', 'Must only contains lowercase alpha numeric').isAlphanumeric();

  const username = req.body.username;
  const password = req.body.password;

  req.getValidationResult()
    .then(Utils.checkValidations)
    .then(() => User.findOne({ username }))
    .then((user) => {
      if (!user) {
        return Promise.reject({ status: 404, error: 'Username not found.', username });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return Promise.reject({ status: 401, error: 'Wrong password', username });
      }
      // return JWT to be used
      return jwt.sign({ username: user.username }, Config.JWT_SECRET_KEY);
    })
    .then(token => res.status(200).send({ token }))
    .catch(err => res.status(err.status ? err.status : 500).send({ err }));
});

// Export Router
module.exports = router;
