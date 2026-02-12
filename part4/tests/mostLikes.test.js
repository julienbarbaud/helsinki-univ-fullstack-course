const { describe, test } = require('node:test');
const { deepStrictEqual } = require('node:assert');
const { mostLikes } = require('../utils/list_helper');
const { blogs } = require('./testUtils');

describe('mostLikes test', () => {
  test('empty array returns null', () => deepStrictEqual(mostLikes([]), null));

  const blog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
  };
  test('single-element array returns the author', () => {
    const expected = { name: 'Edsger W. Dijkstra', likes: 5 };
    deepStrictEqual(mostLikes([blog]), expected);
  });

  test('full array', () => {
    const expected = { name: 'Edsger W. Dijkstra', likes: 17 };
    deepStrictEqual(mostLikes(blogs), expected);
  });
});
