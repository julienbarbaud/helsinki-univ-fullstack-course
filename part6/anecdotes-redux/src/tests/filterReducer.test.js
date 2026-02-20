import { describe, test, expect } from 'vitest'
import { setFilter } from '../reducers/filterReducer'
import filterReducer from '../reducers/filterReducer'

describe('test filter reducer', () => {
  test('undefined state and action returns empty string by default', () => {
    const state = filterReducer(undefined, { type: 'NO_ACTION' });
    expect(state).toBe('');
  })

  test('can set filter to any text value', () => {
    const state = filterReducer(undefined, setFilter('rantanplan'));
    expect(state).toBe('rantanplan');
  })
})
