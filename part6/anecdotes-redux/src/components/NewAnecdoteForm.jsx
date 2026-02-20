import { useDispatch } from "react-redux";
import { post } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const NewAnecdoteForm = () => {
  const dispatch = useDispatch();

  const handlePost = (event) => {
    event.preventDefault();
    const input = event.target.anecdote;
    dispatch(post(input.value));
    dispatch(showNotification(`you posted "${input.value}"`))
    input.value = '';
  }

  return(
    <form onSubmit={handlePost}>
      <input name="anecdote"/>
      <button type="submit">post anecdote</button>
    </form>
  )
}

export default NewAnecdoteForm;
