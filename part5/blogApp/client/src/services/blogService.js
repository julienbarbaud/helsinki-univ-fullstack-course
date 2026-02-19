import axios from "axios";

const endpoint = '/api/blogs/'

const getUserConfig = (user) => {
  if ((!user) || (!user.token)) return {}
  const config = {
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  }
  return config
};

const getAllBlogs = async (setBlogs) => {
  const { data } = await axios.get(endpoint);
  setBlogs(data);
}

const postBlog = async (user, title, url) => {
  const { data } = await axios.post(
    endpoint,
    { title, url },
    getUserConfig(user),
  )
  return data
}

const likeBlog = async (user, blog) => {
  const { id } = blog;
  const { data } = await axios.post(
    endpoint + id + "/likes",
    {},
    getUserConfig(user),
  );
  return data;
};

const removeBlog = async (user, blog) => {
  const { id } = blog;
  await axios.delete(endpoint+id, getUserConfig(user))
};

export default {
  postBlog,
  likeBlog,
  removeBlog,
  getAllBlogs,
}
