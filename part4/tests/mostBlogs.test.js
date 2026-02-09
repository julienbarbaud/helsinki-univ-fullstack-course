const { describe, test } = require('node:test');
const { deepStrictEqual } = require('node:assert');
const { mostBlogs } = require('../utils/list_helper');
const blogs = require('./testParameters');

describe('mostBlogs test', () => {
  test('empty array returns null', () => deepStrictEqual(mostBlogs([]), null));

  const blog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
  };
  test('single-element array returns the author', () => {
    const expected = { name: 'Edsger W. Dijkstra', blogs: 1 };
    deepStrictEqual(mostBlogs([blog]), expected);
  });

  test('full array', () => {
    const expected = { name: 'Robert C. Martin', blogs: 3 };
    deepStrictEqual(mostBlogs(blogs), expected);
  });
});
