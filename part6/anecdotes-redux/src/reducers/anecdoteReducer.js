import { createSlice } from "@reduxjs/toolkit";
import jsonServerService from '../services/jsonServerService'
import { showNotification } from "./notificationReducer";

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    vote(draft, action) {
      draft.find((anecdote) => anecdote.id === action.payload).likes++
    },
    post(draft, action) {
      draft.push(action.payload)
    },
    setAnecdotes(_, action) {
      return action.payload;
    }
  }
})

export default anecdoteSlice.reducer;
export const { post, vote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => async (dispatch) => {
  const anecdotes = await jsonServerService.getAll();
  dispatch(setAnecdotes(anecdotes));
}

export const postAnecdote = (content) => async (dispatch) => {
  const data = await jsonServerService.postNew(content)
  dispatch(post(data))
  dispatch(showNotification(`you posted "${data.content}"`, 3));
}

export const likeAnecdote = (anecdote) => async (dispatch) => {
  await jsonServerService.likePost(anecdote.id, anecdote.likes + 1)
  dispatch(vote(anecdote.id))
  dispatch(showNotification(`you upvoted "${anecdote.content}"`, 3))
}
