/* global describe it before beforeEach*/
/* eslint-disable import/no-extraneous-dependencies */

// Set this as a Test Environment
process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../src/app.js');
const assert = require('assert');
const bcrypt = require('bcrypt');
const User = require('../src/database/user.js');
const Config = require('../src/config.js');
const jwt = require('jsonwebtoken');

beforeEach('Deleting Test Database', () => User.remove({}));

const passwordHash = bcrypt.hashSync('admin', 10);

describe('POST /login', () => {
  it('Login User', () => {
    User.create({ username: 'admin', password: passwordHash, admin: true });
    return request(app)
      .post('/login')
      .send({ username: 'admin', password: 'admin' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const validateJWT = jwt.verify(response.body.token, Config.JWT_SECRET_KEY);
        assert.equal(validateJWT.username, 'admin');
      });
  });

  it('Try to login a user with a wrong password', () => {
    User.create({ username: 'admin', password: passwordHash, admin: true });
    return request(app)
      .post('/login')
      .send({ username: 'admin', password: 'wrongpassword' })
      .expect('Content-Type', /json/)
      .expect(401);
  });

  it('Try to login a user that doenst exists', () => {
    User.create({ username: 'admin', password: 'admin', admin: true });
    return request(app)
      .post('/login')
      .send({ username: 'notAdmin', password: 'admin' })
      .expect('Content-Type', /json/)
      .expect(404);
  });
});
