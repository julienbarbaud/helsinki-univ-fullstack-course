import { describe, test, expect, beforeEach } from 'vitest'
import anecdoteReducer from '../reducers/anecdoteReducer'
import { post, vote } from '../reducers/anecdoteReducer';

const postAnecdote = () => {
  const anecdote = {
    content: 'test anecdote',
    likes: 0,
    id: "id0",
  };
  return anecdoteReducer(undefined, post(anecdote))
}

describe('test anecdote reducer', () => {
  test('calling with no state and no action returns the default anecdote list', () => {
    const defaultState = anecdoteReducer(undefined, { type: 'DO NOTHING' });
    expect(defaultState).toEqual([]);
  })

  test('can post an anecdote', () => {
    const newState = postAnecdote();
    expect(newState.length).toBe(1)
    const newAnecdote = newState.find((anecdote)=>anecdote.content === anecdote.content);

    expect(newAnecdote).toBeDefined();
    expect(newAnecdote.id).toBe("id0")
    expect(newAnecdote.likes).toBe(0);
  })

  describe('When there is an anecdote:', () => {
    let state;
    beforeEach(() => state = postAnecdote())

    test('can vote for a note', () => {
      const voteId = "id0";
      const newState = anecdoteReducer(state, vote(voteId));
      expect(newState.find((anecdote) => anecdote.id === voteId).likes).toEqual(1)
    })
  })

})
