import { useState } from "react"
import blogService from "../services/blogService"

const BlogInput = ({ state, set, name }) => {
  const handleChange = (event) => set(event.target.value)

  return(
      <div>
        <label>{name}:
          <input value={state} onChange={handleChange}/>
        </label>
      </div>
  )
}

const PostForm = ({ user, blogState, setNotif }) => {
  // we do not include an "author" field because that makes no sense.
  // The author is automatically set as the logged-in user.
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const postedBlog = await blogService.postBlog(user, title, url)
      console.log(postedBlog);
      setNotif({
        message: `posted blog: ${postedBlog.title}`,
        isError: false,
      })
      setTitle('')
      setUrl('')
      blogState.setBlogs(blogState.blogs.concat(postedBlog))
    } catch (error) {
      console.log(error);
      setNotif({
        message:  `Failed to post the blog:\n${error.response.data.error || error.message}`,
        isError: true,
      })
    }
  }

  return(
    <form onSubmit={handleSubmit}>
      <BlogInput state={title} set={setTitle} name="title"/>
      <BlogInput state={url} set={setUrl} name="url"/>
      <button type="submit">post blog</button>
    </form>
  )
}

export default PostForm
