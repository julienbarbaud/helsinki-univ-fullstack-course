const wtf = require('wtfnode');
const { test, describe, beforeEach, after } = require('node:test');
const assert = require('node:assert');
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Blog = require('../models/blog');
const e = require('express');
const { endianness } = require('node:os');

const api = supertest(app);

const initialBlogs = [
  {
    title: 'I was here',
    author: 'me',
    likes: 1,
    url: 'www.fakeurl4me.com',
  },
  {
    title: 'you was here',
    author: 'you',
    likes: 25,
    url: 'www.fakeurl4u.com',
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  const savePromises = initialBlogs.map((blog) => new Blog(blog).save());
  await Promise.all(savePromises);
});

describe('testing /api/blogs endpoint', () => {
  const endpoint = '/api/blogs'
  test('response returns json', async () => {
    await api
      .get(endpoint)
      .expect(200)
      .expect('Content-type', /application\/json/);
  });

  test('test db contains the right entries', async () => {
    const response = await api.get(endpoint);
    assert.strictEqual(response.body.length, initialBlogs.length);
    assert(response.body.map((blog)=>blog.title).includes(initialBlogs[1].title))
  });

  test('blog posts contain an id field', async () => {
    const { body } = await api.get(endpoint);
    assert(body.reduce((hasId, blog) => hasId && (blog.id !== undefined)), true)
  })

  test('posting a new blog works', async () => {
    const newBlog = {
      author: "them",
      title: "the more the merrier",
      likes: 131,
      url: "www.fakeurl4them.com"
    }
    await api
      .post(endpoint)
      .send(newBlog)
      .expect(201)
      .expect('Content-type', /application\/json/)

    const { body:newBlogList } = await api.get(endpoint)
    assert.strictEqual(newBlogList.length, initialBlogs.length + 1);
    assert(newBlogList.map((blog) => blog.title).includes(newBlog.title));
  })

  test("posting without a likes field defaults to 0 likes", async () => {
    const partialBlog = {
      author: "E.A. Poe",
      title: "Nevermore",
      url: "www.fakeurl4ravens.com"
    }
    const result = await api
      .post(endpoint)
      .send(partialBlog)
      .expect(201)
      .expect('Content-type', /application\/json/)
    assert.strictEqual(result.body.likes, 0)
  })

  test("posting without a title or url leads to 400 bad request", async () => {
    const blog = {
      author: "R. Kipling",
      title: "If",
      url: "www.fakeurl4son.com",
      likes: 2500,
    }

    const postAndExpect400 = async (payload) => api.post(endpoint).send(payload).expect(400)

    const { title, ...noTitle } = blog;
    await postAndExpect400(noTitle);

    const { url, ...noUrl } = blog;
    await postAndExpect400(noUrl);
  })

  test('can delete note', async () => {
    const { body } = await api.get(endpoint);
    const numberOfBlogs = body.length;
    const blogToDelete = body[1]

    await api
      .delete(endpoint + '/' + blogToDelete.id)
      .expect(204)

    const { body:newBlogs }  = await api.get(endpoint);
    assert.strictEqual(newBlogs.length, numberOfBlogs - 1)
    assert(!newBlogs.map((blog)=>blog.title).includes(blogToDelete.title))
  })

  test('Can update', async () => {
    const { body:blogs } = await api.get(endpoint)
    const updated = {
      ...blogs[0],
      title: "newTitle",
      url: "www.new.com",
    };

    console.log(updated)

    await api
      .put(endpoint + '/' + updated.id)
      .send(updated)
      .expect(200)
      .expect("Content-type", /application\/json/)

    const { body:newBlogs } = await api.get(endpoint)
    assert.strictEqual(blogs.length, newBlogs.length);
    assert(newBlogs.map((blog)=>[blog.title, blog.url].includes([updated.title, updated.url])))
    console.log('test is over')
  })

});

after(async () => {
  await mongoose.disconnect();
  console.log('Database closed');
});
