import { useDispatch } from "react-redux";
import { likeAnecdote } from "../reducers/anecdoteReducer";

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();

  const handleLike = () => {
    console.log(`clicked on id ${anecdote.id}`);
    dispatch(likeAnecdote(anecdote))
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
