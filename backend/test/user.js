/* global describe it before beforeEach*/
/* eslint-disable import/no-extraneous-dependencies */

// Set this as a Test Environment
process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../src/app.js');
const assert = require('assert');
const User = require('../src/database/user.js');

beforeEach('Deleting Test Database', () => User.remove({}));

describe('POST /user', () => {
  it('Create a User', () => {
    return request(app)
      .post('/user')
      .send({ username: 'admin', password: 'admin', admin: true })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        assert.equal(response.body.username, 'admin');
        assert.equal(response.body.admin, true);
      });
  });

  it('Create a User That already Exists', () => {
    User.create({ username: 'admin', password: 'admin', admin: true });
    return request(app)
      .post('/user')
      .send({ username: 'admin', password: 'admin', admin: true })
      .expect('Content-Type', /json/)
      .expect(409);
  });
});
