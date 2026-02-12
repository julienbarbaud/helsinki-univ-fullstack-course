const {
  test, describe, beforeEach, after,
} = require('node:test');
const assert = require('node:assert');
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const { initializeDB, loginInfo, login } = require('./testUtils');

const api = supertest(app);
const newBlog = {
  title: 'the more the merrier',
  likes: 131,
  url: 'www.fakeurl4them.com',
};
let initialBlogs;

beforeEach(async () => {
  ({ blogs: initialBlogs } = await initializeDB());
});

describe('testing /api/blogs endpoint', () => {
  const endpoint = '/api/blogs';
  test('response returns json', async () => {
    await api
      .get(endpoint)
      .expect(200)
      .expect('Content-type', /application\/json/);
  });

  test('test db contains the right entries', async () => {
    const response = await api.get(endpoint);
    assert.strictEqual(response.body.length, initialBlogs.length);
    assert(response.body.map((blog) => blog.title).includes(initialBlogs[1].title));
  });

  test('blog posts contain an id field', async () => {
    const { body } = await api.get(endpoint);
    assert(body.reduce((hasId, blog) => hasId && (blog.id !== undefined)), true);
  });

  test('posting a new blog without authentication doesnt work', async () => {
    const { body } = await api
      .post(endpoint)
      .send(newBlog)
      .expect(401)
      .expect('Content-type', /application\/json/);

    assert.strictEqual(body.error, 'Authentication failed');
  });

  test('posting a blog after login works', async () => {
    const { user, token } = await login(api, loginInfo[0]);
    const initUserPosts = user.posts.length;

    const { body } = await api
      .post(endpoint)
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-type', /application\/json/);

    const newBlogs = await Blog.find({});
    assert.strictEqual(initialBlogs.length + 1, newBlogs.length);
    const newUser = await User.findById(user.id);
    assert.strictEqual(newUser.posts.length, initUserPosts + 1);
    assert(newUser.posts.map((post) => post.toString()).includes(body.id.toString()));
  });

  test('posting without a likes field defaults to 0 likes', async () => {
    const { token } = await login(api, loginInfo[1]);
    const partialBlog = {
      title: 'Nevermore',
      url: 'www.fakeurl4ravens.com',
    };
    const result = await api
      .post(endpoint)
      .set('Authorization', `Bearer ${token}`)
      .send(partialBlog)
      .expect(201)
      .expect('Content-type', /application\/json/);
    assert.strictEqual(result.body.likes, 0);
  });

  test('posting without a title or url leads to 400 bad request', async () => {
    const blog = {
      title: 'If',
      url: 'www.fakeurl4son.com',
      likes: 2500,
    };

    const { token } = await login(api, loginInfo[0]);

    const postAndExpect400 = async (payload) => api
      .post(endpoint)
      .set('Authorization', `Bearer ${token}`)
      .send(payload)
      .expect(400);

    const { title, ...noTitle } = blog;
    await postAndExpect400(noTitle);

    const { url, ...noUrl } = blog;
    await postAndExpect400(noUrl);
  });

  test('can delete note only with correct auth', async () => {
    let { user, token } = await login(api, loginInfo[1]);
    const { token: wrongToken } = await login(api, loginInfo[0]);
    // posting a blog to the user's name to make sure there is at least 1 to delete:
    await api
      .post(endpoint)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'dummy blog', url: 'justwww' });

    user = await User.findById(user.id);
    const blogToDelete = await Blog.findById(user.posts[0]);
    const numberOfBlogs = (await Blog.find({})).length;

    // user trying to delete a blog that is not his should be rejected
    await api
      .delete(`${endpoint}/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${wrongToken}`)
      .expect(401);

    let newBlogs = await Blog.find({});
    assert.strictEqual(numberOfBlogs, newBlogs.length);
    assert(newBlogs.map((blog) => blog.title).includes(blogToDelete.title));

    // user deleting his own post should be accepted
    await api
      .delete(`${endpoint}/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);

    newBlogs = await Blog.find({});
    assert.strictEqual(newBlogs.length, numberOfBlogs - 1);
    assert(!newBlogs.map((blog) => blog.title).includes(blogToDelete.title));
  });

  test.only('Can update', async () => {
    let { user, token } = await login(api, loginInfo[0]);
    const { token: wrongToken } = await login(api, loginInfo[1]);
    // posting a blog to the user's name to make sure there is at least 1 to delete:
    await api
      .post(endpoint)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'another goddamn blog', url: 'justwww' });

    user = await User.findById(user.id);
    const blogToUpdate = await Blog.findById(user.posts[0]);
    console.log(user);
    await api
      .put(`${endpoint}/${blogToUpdate.id.toString()}`)
      .set('Authorization', `Bearer ${wrongToken}`)
      .send({ title: 'updated title' })
      .expect(401);

    await api
      .put(`${endpoint}/${blogToUpdate.id.toString()}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'updated title' })
      .expect(200)
      .expect('Content-type', /application\/json/);

    const newBlogs = await Blog.find({});
    assert(newBlogs.map((blog) => blog.title).includes('updated title'));
  });
});

after(async () => {
  await mongoose.disconnect();
  console.log('Database closed');
});
