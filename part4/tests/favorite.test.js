const { test, describe } = require('node:test');
const { deepStrictEqual } = require('node:assert');
const { favoriteBlog } = require('../utils/list_helper');
const blogs = require('./testParameters');

describe('favorite blog tests', () => {
  test('empty list returns a null object', () => deepStrictEqual(favoriteBlog([]), null));

  test('single-element list returns the element', () => {
    const blog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
    };
    deepStrictEqual(favoriteBlog([blog]), blog);
  });

  test('typical list', deepStrictEqual(favoriteBlog(blogs), blogs[2]));
});
