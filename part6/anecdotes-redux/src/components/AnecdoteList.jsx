import { useSelector } from "react-redux";
import Anecdote from "./Anecdote";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeAnecdotes } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  useEffect(
    () => {
      dispatch(initializeAnecdotes())
    },
    [dispatch]
  )

  const filter = useSelector((state => state.filter));
  console.log('filter: ', filter);

  const allAnecdotes = useSelector((state) => state.anecdotes);
  const anecdotes = allAnecdotes.filter(
    ({ content }) => content.toLowerCase().includes(filter.toLowerCase())
  );
  anecdotes.sort((a, b) => b.likes - a.likes)
  console.log('anecdotes: ', anecdotes)

  return(
    <ul>
      {anecdotes.map((anecdote) => <li key={anecdote.id}><Anecdote anecdote={anecdote}/></li>)}
    </ul>
  )
}

export default AnecdoteList;
