import { useParams } from "react-router-dom";
import { useGetAllBlogsQuery } from "../services/blogApi";
import { usePostCommentMutation } from "../services/blogApi";
import { useDispatch } from "react-redux";
import { showError, showNotif } from "../reducers/notificationReducer";

const Blog = () => {
  const { id } = useParams();
  const { data: blogs, isLoading } = useGetAllBlogsQuery();
  const [postComment, _] = usePostCommentMutation();
  const dispatch = useDispatch();

  if (isLoading) return <div>loading</div>;
  const blog = blogs.find((b) => b.id === id);

  const handleCommentSubmit = async (event) => {
    try {
      event.preventDefault();
      await postComment({ blogId: id, comment: event.target.comment.value });
      dispatch(showNotif("posted comment"));
      event.target.comment.value = "";
    } catch (error) {
      dispatch(showError("failed to post comment"));
      console.error(error.message);
    }
  };

  return (
    <>
      <h4>{blog.title}</h4>
      <b>by {blog.author.name}</b>
      <p>url: {blog.url}</p>
      <p>likes: {blog.likes}</p>
      <h5>Comments: </h5>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment.slice(0, 10)}>{comment}</li>
        ))}
      </ul>
      <form onSubmit={handleCommentSubmit}>
        <input name="comment"></input>
        <button type="submit">post comment</button>
      </form>
    </>
  );
};

export default Blog;
