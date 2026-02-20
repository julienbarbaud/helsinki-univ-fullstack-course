import { useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(vote(anecdote.id))
    dispatch(showNotification(`you upvoted "${anecdote.content}"`))
  };

  return(
    <div>
      <p>{anecdote.content}</p>
      <p>
        {anecdote.likes}
        <button onClick={handleLike}>likes</button></p>
    </div>
  );
}

export default Anecdote;
