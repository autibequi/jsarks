/* global describe it before beforeEach*/
/* eslint-disable import/no-extraneous-dependencies */

// Set this as a Test Environment
process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../src/app.js');
const bcrypt = require('bcrypt');
const assert = require('assert');
const User = require('../src/database/user.js');
const Bookmark = require('../src/database/bookmark.js');
const Config = require('../src/config.js');
const jwt = require('jsonwebtoken');
const Promise = require('bluebird');

beforeEach('Deleting Test Database', () => {
  return User.remove({});
});

describe('POST /bookmark', () => {
  const JWT = jwt.sign({ username: 'user' }, Config.JWT_SECRET_KEY);

  it('Throw error if without JWT', () => {
    return request(app)
      .post('/bookmark')
      .expect(401);
  });

  it('Add a Bookmark', () => {
    const passwordHash = bcrypt.hashSync('user', 10);
    return User.create({ username: 'user', password: passwordHash, admin: true })
    .then(() => {
      request(app)
      .post('/bookmark')
      .set('Authorization', `Bearer ${JWT}`)
      .send({ title: 'NovaPagina', url: 'http://google.com' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        assert.equal(response.body.title, 'NovaPagina');
        assert.equal(response.body.url, 'http://google.com');
      });
    });
  });
});

describe('PUT /bookmark', () => {
  const JWT = jwt.sign({ username: 'user' }, Config.JWT_SECRET_KEY);

  it('Modify a Bookmark', () => {
    const passwordHash = bcrypt.hashSync('user', 10);
    return User.create({ username: 'user', password: passwordHash, admin: true })
      .then(owner => Bookmark.create({ title: 'OldPage', url: 'http://old.com', owner }))
      .then((oldpage) => {
        return request(app)
          .put(`/bookmark/${oldpage._id}`)
          .set('Authorization', `Bearer ${JWT}`)
          .send({ title: 'NewPage', url: 'http://new.com' })
          .expect('Content-Type', /json/)
          .expect(200)
          .then((response) => {
            assert.equal(response.body.title, 'NewPage');
            assert.equal(response.body.url, 'http://new.com');
          });
      });
  });
});

describe('DELETE /bookmark', () => {
  const JWT = jwt.sign({ username: 'user' }, Config.JWT_SECRET_KEY);

  it('Remove a Bookmark', () => {
    const passwordHash = bcrypt.hashSync('user', 10);
    return User.create({ username: 'user', password: passwordHash, admin: true })
      .then(owner => Bookmark.create({ title: 'OldPage', url: 'http://old.com', owner }))
      .then((oldpage) => {
        return request(app)
          .delete(`/bookmark/${oldpage._id}`)
          .set('Authorization', `Bearer ${JWT}`)
          .expect('Content-Type', /json/)
          .expect(200)
          .then(() => Bookmark.findById(oldpage._id))
          .then((response) => {
            assert.equal(response, null);
          });
      });
  });
});

describe('GET /bookmark', () => {
  beforeEach((done) => {
    const passwordHash = bcrypt.hashSync('user', 10);

    User.remove({})
      .then(() => Bookmark.remove({}))
      .then(() => Promise.all([
        User.create({ username: 'admin', password: passwordHash, admin: true }),
        User.create({ username: 'user', password: passwordHash, admin: false }),
      ]))
      .spread((admin, user) => Promise.all([
        Bookmark.create({ title: 'Page1', url: 'http://old.com', owner: admin }),
        Bookmark.create({ title: 'Page2', url: 'http://old.com', owner: user }),
        Bookmark.create({ title: 'Page3', url: 'http://old.com', owner: user }),
        Bookmark.create({ title: 'page4', url: 'http://old.com', owner: user }),
      ]))
      .then(() => done());
  });

  it('Get Bookmarks as Admin User', () => {
    const JWT = jwt.sign({ username: 'admin' }, Config.JWT_SECRET_KEY);
    return request(app)
      .get('/bookmark/')
      .set('Authorization', `Bearer ${JWT}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        assert.equal(response.body.length, 4);
      });
  });

  it('Get Bookmarks as Normal User', () => {
    const JWT = jwt.sign({ username: 'user' }, Config.JWT_SECRET_KEY);
    return request(app)
      .get('/bookmark/')
      .set('Authorization', `Bearer ${JWT}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        assert.equal(response.body.length, 3);
      });
  });
});
