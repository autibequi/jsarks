// Modules
const express = require('express');
const bcrypt = require('bcrypt');

// Custom Modules
const User = require('../database/user.js');
const Utils = require('../utils.js');

// Setup
const router = express.Router();

// Create user
router.post('/user', (req, res) => {
  req.checkBody('username', 'password', 'admin', 'Must not be empty').notEmpty();
  req.checkBody('username', 'Must only contains lowercase alpha numeric').isAlphanumeric();
  req.checkBody('admin', 'Must not be empty').isBoolean();

  const username = req.body.username;
  const password = req.body.password;
  const admin = req.body.admin;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  req.getValidationResult()
    .then(Utils.checkValidations)
    .then(() => User.create({ username, password: hash, admin }))
    .catch((err) => {
      if (err.code === 11000) {
        return Promise.reject({ status: 409, error: 'User Already Exists', username });
      }
      return err;
    })
    .then(user => res.status(200).send({ username: user.username, admin: user.admin }))
    .catch(err => res.status(err.status ? err.status : 500).send({ err }));
});

// Export Router
module.exports = router;
