const {
  test, describe, beforeEach, after,
} = require('node:test');
const supertest = require('supertest');
const assert = require('node:assert');
const { default: mongoose } = require('mongoose');
const { hash } = require('bcrypt');
const User = require('../models/user');
const app = require('../app');
const config = require('../utils/config');

const api = supertest(app);
const endpoint = '/api/users';
const initialUsers = [
  {
    username: 'root',
    name: 'Odin',
    password: 'pwd1',
  },
  {
    username: 'user1',
    name: 'Loki',
    password: 'supergoodpassword',
  },
];

beforeEach(async () => {
  await User.deleteMany({});
  const savePromises = initialUsers
    .map(async (user) => new User({
      ...user,
      password: await hash(user.password, config.CRYPTO_SALT_ROUNDS),
    }).save());
  await Promise.all(savePromises);
});

describe('test the GET /api/users endpoint', () => {
  test('users are being returned ok and have an id field', async () => {
    const { body } = await api
      .get(endpoint)
      .expect(200)
      .expect('Content-type', /application\/json/);
    assert.strictEqual(body.length, initialUsers.length);
    assert(body.map((user) => user.username).includes(initialUsers[0].username));
    assert(body[0].id);
  });
});

describe('test the POST /api/users endpoint', () => {
  test('Can add a new user', async () => {
    const newUser = {
      username: 'newUser',
      name: 'Thor',
      password: '3154684615',
    };

    const { body } = await api
      .post(endpoint)
      .send(newUser)
      .expect(200)
      .expect('Content-type', /application\/json/);
    assert(body.id);
    assert.strictEqual(body.username, newUser.username);

    const users = await User.find({});
    assert.strictEqual(users.length, initialUsers.length + 1);
    assert(users.map((user) => user.username).includes(newUser.username));
  });

  test('non-unique username gets rejected', async () => {
    const duplicateUser = {
      ...initialUsers[0],
      password: 'differentPassword',
    };
    const { body } = await api
      .post(endpoint)
      .send(duplicateUser)
      .expect(400);

    assert.strictEqual(body.error, 'This username is already taken');
  });

  test('passwords and usernames have to be at least 3 characters', async () => {
    const shortName = {
      username: 'a',
      name: 'Tyr',
      password: '88888888',
    };

    let { body } = await api
      .post(endpoint)
      .send(shortName)
      .expect(400)
      .expect('Content-type', /application\/json/);

    assert(body.error);
    console.log('short username error message: ', body.error);

    const shortPwd = {
      username: 'NewGuy',
      name: 'Baldur',
      password: '1',
    };

    ({ body } = await api
      .post(endpoint)
      .send(shortPwd)
      .expect(400)
      .expect('Content-type', /application\/json/));

    assert(body.error);
    console.log('short password error message: ', body.error);
  });
});

after(() => {
  mongoose.disconnect();
  console.log('database closed');
});
