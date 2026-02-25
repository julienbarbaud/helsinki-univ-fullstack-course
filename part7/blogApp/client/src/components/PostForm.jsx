import { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotif, showError } from "../reducers/notificationReducer";
import { usePostNewBlogMutation } from "../services/blogApi";
import { useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";

const BlogInput = ({ state, set, name }) => {
  const handleChange = (event) => set(event.target.value);
  return <TextField label={name} value={state} onChange={handleChange} />;
};

const PostForm = () => {
  // we do not include an "author" field because that makes no sense.
  // The author is automatically set as the logged-in user.
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();
  const [postNewBlog, _] = usePostNewBlogMutation();
  const user = useSelector((state) => state.user);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const postedBlog = await postNewBlog({
        user,
        blogData: { title, url },
      }).unwrap();
      dispatch(showNotif(`posted blog: ${postedBlog.title}`));
      setTitle("");
      setUrl("");
    } catch (error) {
      console.log(error);
      dispatch(showError(`failed to post: ${error.message}`));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <BlogInput state={title} set={setTitle} name="title" />
      <BlogInput state={url} set={setUrl} name="url" />
      <Button type="submit">post blog</Button>
    </form>
  );
};

export default PostForm;
