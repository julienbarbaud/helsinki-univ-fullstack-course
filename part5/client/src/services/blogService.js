import axios from "axios";

const endpoint = '/api/blogs'

const getUserConfig = (user) => {
  if ((!user) || (!user.token)) return {}
  const config = {
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  }
  return config
}

const postBlog = async (user, title, url) => {
  const { data } = await axios.post(
    endpoint,
    { title, url },
    getUserConfig(user),
  )
  return data
}

export default { postBlog }
