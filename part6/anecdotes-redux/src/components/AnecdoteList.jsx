import { useSelector } from "react-redux";
import Anecdote from "./Anecdote";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state);
  anecdotes.sort((a, b) => b.likes - a.likes)
  console.log('anecdotes: ', anecdotes)

  return(
    <ul>
      {anecdotes.map((anecdote) => <li key={anecdote.id}><Anecdote anecdote={anecdote}/></li>)}
    </ul>
  )
}

export default AnecdoteList;
