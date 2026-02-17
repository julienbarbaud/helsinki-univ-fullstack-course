import axios from "axios"
import { useEffect, useState } from "react"
import PostForm from "./PostForm"
import Togglable from "./Togglable"
import blogService from "../services/blogService"

const blogEndpoint = '/api/blogs'


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

  return (
    <>
    <tbody className="blog-row">
      <tr>
        <td>{blog.title}</td>
        <td>by {blog.author.name}</td>
      </tr>
      <Togglable toggleText="view details" hideText="hide details">
        <tr><td>url: {blog.url}</td></tr>
        <tr>
          <td>likes: {blog.likes}</td>
          <td><button onClick={handleLike}>like</button></td>
        </tr>
        <tr><td>author username: {blog.author.username}</td></tr>
        <tr><td colSpan="2"><button onClick={handleRemove}>remove</button></td></tr>
      </Togglable>
    </tbody>
    <br></br>
    </>
  )
}

const BlogList = ({ user, setNotif }) => {
  const [blogs, setBlogs] = useState([])
  const blogState = { blogs, setBlogs }

  const setBlog = (blogId, newBlog) => {
    console.log('set blog');
    console.log(newBlog);
    // if newBlog is null, it signals a delete operation
    if (newBlog === null) {
      const filteredBlogs = blogs.filter((blog)=>blog.id.toString() !== blogId.toString())
      console.log(filteredBlogs);
      setBlogs(filteredBlogs);
      return
    }
    const newBlogs = blogs.map((blog) => {
      if (blog.id.toString() === blogId.toString()){
        return newBlog;
      }
      return blog;
    });
    console.log(newBlogs);
    setBlogs(newBlogs);
  }

  // loading the blogs
  useEffect(
    () => {
      // exceptionally using .then syntax here because useEffect does not take async callbacks
      axios
        .get(blogEndpoint)
        .then((response) => {
          setBlogs(response.data)
        })
    },
    []
  )
  //sorting blogs by likes
  blogs.sort((a, b) => b.likes-a.likes);
  return(
    <div>
      <h2>Blogs</h2>
      <Togglable toggleText="create new blog" hideText="cancel">
        <PostForm blogState={blogState} user={user} setNotif={setNotif}/>
      </Togglable>
      <table>
        <thead>
          <th>title</th>
          <th>author</th>
        </thead>
        {blogs.map((blog) => <BlogRow key={blog.id} blog={blog} user={user} setBlog={(newBlog) => setBlog(blog.id, newBlog)}/>)}
      </table>
    </div>
  )
}

export default BlogList
