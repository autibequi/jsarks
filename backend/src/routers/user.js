// Modules
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Custom Modules
const User = require('../database/user.js');
const Config = require('../config.js');
const Utils = require('../utils.js');

// Setup
const router = express.Router();

// Get User
router.get('/user', (req, res) => {
  const JWTData = jwt.verify(Utils.getToken(req), Config.JWT_SECRET_KEY);

  User.findOne({ username: JWTData.username }).exec()
    .then((user) => {
      if (!user.admin) {
        return Promise.reject({ status: 401, error: 'Not Authorized' });
      }
      return User.find({});
    })
    .then(users => res.status(200).send(users))
    .catch(err => res.status(err.status ? err.status : 500).send({ err }));
});

// Create user
router.post('/user', (req, res) => {
  req.checkBody('username', 'password', 'admin', 'Must not be empty').notEmpty();
  req.checkBody('username', 'Must only contains lowercase alpha numeric').isAlphanumeric();
  req.checkBody('admin', 'Must not be empty').isBoolean();

  const username = req.body.username;
  const password = req.body.password;
  const admin = req.body.admin;

  const hash = bcrypt.hashSync(password, 10);

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
