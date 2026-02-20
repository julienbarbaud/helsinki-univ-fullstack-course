import deepFreeze from 'deep-freeze'
import { describe, expect, test } from 'vitest'
import counterReducer from './counterReducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('ok is incremented', () => {
    const action = { type: "OK" }
    deepFreeze(initialState)
    const newState = counterReducer(initialState, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0,
    })
  })

  test('bad is incremented', () => {
    const action = { type: "BAD" }
    deepFreeze(initialState)
    const newState = counterReducer(initialState, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1,
    })
  })

  test('can reset', () => {
    let state = initialState;
    deepFreeze(state);
    const expectedState = {
      good: 5,
      ok: 3,
      bad: 1,
    };

    for (const actionType of Object.keys(expectedState)){
      for (let i=0; i<expectedState[actionType]; i++) {
        state = counterReducer(state, { type: actionType.toUpperCase()});
        console.log('new state var', state);
      }
    }
    expect(state).toEqual(expectedState);

    state = counterReducer(state, { type: "RESET" });
    expect(state).toEqual(initialState);
  })
})
