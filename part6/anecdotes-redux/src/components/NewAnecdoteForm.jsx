import { useDispatch } from "react-redux";
import { postAnecdote } from "../reducers/anecdoteReducer";

const NewAnecdoteForm = () => {
  const dispatch = useDispatch();

  const handlePost = (event) => {
    event.preventDefault();
    dispatch(postAnecdote(event.target.anecdote.value))
    event.target.anecdote.value = '';
  }

  return(
    <form onSubmit={handlePost}>
      <input name="anecdote"/>
      <button type="submit">post anecdote</button>
    </form>
  )
}

export default NewAnecdoteForm;
