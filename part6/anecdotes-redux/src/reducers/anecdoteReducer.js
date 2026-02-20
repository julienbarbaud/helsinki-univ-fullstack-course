import initialAnecdotes from "../utils/anecdoteSetup";
import { generateId } from "../utils/anecdoteSetup";

export const vote = (id) => {
  return {
    type: 'VOTE',
    payload: id,
  }
}

export const post = (content) => {
  return {
    type: 'POST',
    payload: {
      content,
      likes: 0,
      id: generateId(),
    },
  }
}

const anecdoteReducer = (state=initialAnecdotes, action) => {
  console.log(action);
  switch (action.type) {
    case 'VOTE': {
      const id = action.payload;
      return state.map(
        (anecdote) => anecdote.id === id ? {...anecdote, likes: anecdote.likes + 1} : anecdote
      );
    }
    case 'POST':
      return state.concat(action.payload);
    default:
      return state;
  }
}

export default anecdoteReducer
