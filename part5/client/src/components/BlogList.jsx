import axios from "axios"
import { useEffect, useState } from "react"
import PostForm from "./PostForm"

const blogEndpoint = '/api/blogs'

const BlogRow = ({ blog }) => (
  <tr>
    <td>{blog.title}</td>
    <td>{blog.author.name}</td>
  </tr>
)

const BlogList = ({ user, setNotif }) => {
  const [blogs, setBlogs] = useState([])
  const blogState = { blogs, setBlogs }

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

  return(
    <div>
      <h2>Blogs</h2>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
          </tr>
          {blogs.map((blog) => <BlogRow key={blog.id} blog={blog}/>)}
        </tbody>
      </table>
      <PostForm blogState={blogState} user={user} setNotif={setNotif}/>
    </div>
  )
}

export default BlogList
