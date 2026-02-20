import { describe, test, expect } from 'vitest'
import initialAnecdotes from '../utils/anecdoteSetup'
import anecdoteReducer from '../reducers/anecdoteReducer'
import { post, vote } from '../reducers/anecdoteReducer';

console.log("imported anecdotes:", initialAnecdotes);

describe('test anecdote reducer', () => {
  test('calling with no state and no action returns the default anecdote list', () => {
    const defaultState = anecdoteReducer(undefined, { type: 'DO NOTHING' });
    expect(defaultState).toEqual(initialAnecdotes);
  })

  test('can vote for a note', () => {
    const voteId = initialAnecdotes[2].id;
    const newState = anecdoteReducer(undefined, vote(voteId));
    expect(newState.find((anecdote) => anecdote.id === voteId).likes).toEqual(1)
  })

  test('can post an anecdote', () => {
    const quote = 'test anecdote';
    const newState = anecdoteReducer(undefined, post(quote))
    expect(newState.length).toBe(initialAnecdotes.length + 1)
    const newAnecdote = newState.find((anecdote)=>anecdote.content === quote);

    expect(newAnecdote).toBeDefined();
    expect(newAnecdote.id).toBeLessThanOrEqual(1000000)
    expect(newAnecdote.likes).toBe(0);
  })
})
