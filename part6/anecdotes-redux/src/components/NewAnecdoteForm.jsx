import { useDispatch } from "react-redux";
import { post } from "../reducers/anecdoteReducer";

const NewAnecdoteForm = () => {
  const dispatch = useDispatch();

  const handlePost = (event) => {
    event.preventDefault();
    dispatch(post(event.target.anecdote.value));
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
