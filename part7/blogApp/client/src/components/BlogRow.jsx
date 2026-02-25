import { useDispatch, useSelector } from "react-redux";
import Togglable from "./Togglable";
import { showError, showNotif } from "../reducers/notificationReducer";
import {
  useLikeBlogMutation,
  useRemoveBlogMutation,
} from "../services/blogApi";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";

const BlogRow = ({ blog }) => {
  const dispatch = useDispatch();
  const [likeBlog, _] = useLikeBlogMutation();
  const [removeBlog, __] = useRemoveBlogMutation();
  const blogId = blog.id.toString();
  const user = useSelector((state) => state.user);

  // NB: we created a new likes endpoint in the backend, because a full put request seemed nonsensical
  const handleLike = async () => {
    try {
      const newBlog = await likeBlog({ user, blogId }).unwrap();
      dispatch(showNotif(`you voted for ${newBlog.title}`));
    } catch (error) {
      dispatch(showError(`failed to like ${blog.title}`));
      console.error("failed to like the blog: ", error.message);
    }
  };

  const handleRemove = async () => {
    try {
      await removeBlog({ user, blogId });
      dispatch(showNotif(`brutally removed ${blog.title}`));
    } catch (error) {
      dispatch(showError(`could not delete ${blog.title}`));
      console.error(error.message);
    }
  };

  const userIsAuthor =
    blog.author.username.toString() === user.username.toString();
  return (
    <>
      <tbody className="blog-row">
        <tr>
          <td>
            <Button component={Link} to={`/${blog.id}`}>
              <Typography style={{ fontWeight: "bold" }}>
                {blog.title}
              </Typography>
            </Button>
          </td>
          <td>
            <Typography>by {blog.author.name}</Typography>
          </td>
        </tr>
        <Togglable toggleText="view details" hideText="hide details" asTable>
          <tr>
            <td>
              <Typography>url: {blog.url}</Typography>
            </td>
          </tr>
          <tr>
            <td>
              <Typography>likes: {blog.likes}</Typography>
            </td>
            <td>
              <Button variant="contained" onClick={handleLike}>
                like
              </Button>
            </td>
          </tr>
          <tr>
            <td>
              <Typography>author username: {blog.author.username}</Typography>
            </td>
          </tr>
          {userIsAuthor && (
            <tr>
              <td colSpan="2">
                <Button onClick={handleRemove}>remove</Button>
              </td>
            </tr>
          )}
        </Togglable>
      </tbody>
      <tbody>
        <tr className="spacer-row"></tr>
      </tbody>
    </>
  );
};

export default BlogRow;
