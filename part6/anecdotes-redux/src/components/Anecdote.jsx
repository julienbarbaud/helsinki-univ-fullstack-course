import { useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();

  const handleLike = () => dispatch(vote(anecdote.id));

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
