const { test, describe } = require('node:test');
const { strictEqual } = require('node:assert');
const { dummy } = require('../utils/list_helper');

describe('dummy tests', () => {
  test('empty array', () => strictEqual(dummy([]), 1));

  test('long array', () => strictEqual(dummy([1, 5, 9, 6, 3, 4, 7, 5, 6]), 1));
});
