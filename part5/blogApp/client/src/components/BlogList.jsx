import { useEffect, useState } from "react"
import PostForm from "./PostForm"
import Togglable from "./Togglable"
import BlogRow from "./BlogRow"
import blogService from '../services/blogService'

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
      blogService.getAllBlogs(setBlogs)
    },
    [],
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
          <tr>
            <th>title</th>
            <th>author</th>
          </tr>
        </thead>
        {blogs.map((blog) => <BlogRow key={blog.id} blog={blog} user={user} setBlog={(newBlog) => setBlog(blog.id, newBlog)}/>)}
      </table>
    </div>
  )
}

export default BlogList
