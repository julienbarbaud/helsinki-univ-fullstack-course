import blogService from "../services/blogService";
import Togglable from "./Togglable";

const BlogRow = ({ user, blog, setBlog }) => {
  // NB: we created a new likes endpoint in the backend, because a full put request seemed nonsensical
  const handleLike = async () => {
    const newBlog = await blogService.likeBlog(user, blog)
    console.log('updating info:');
    console.log(newBlog);
    setBlog(newBlog);
  }

  const handleRemove = async () => {
    await blogService.removeBlog(user, blog);
    setBlog(null);
  }

  const userIsAuthor = blog.author.username.toString() === user.username.toString();
  return (
    <>
    <tbody className="blog-row">
      <tr>
        <td>{blog.title}</td>
        <td>by {blog.author.name}</td>
      </tr>
      <Togglable toggleText="view details" hideText="hide details" asTable>
        <tr><td>url: {blog.url}</td></tr>
        <tr>
          <td>likes: {blog.likes}</td>
          <td><button onClick={handleLike}>like</button></td>
        </tr>
        <tr><td>author username: {blog.author.username}</td></tr>
        {(userIsAuthor) && <tr><td colSpan="2"><button onClick={handleRemove}>remove</button></td></tr>}
      </Togglable>
    </tbody>
    <tbody>
      <tr className="spacer-row"></tr>
    </tbody>
    </>
  )
}


export default BlogRow
