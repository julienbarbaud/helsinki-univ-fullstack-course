import axios from "axios"
const endpoint = '/api/login'

const login = async(username, password) => {
  const { data: user } = await axios.post(endpoint, { username, password })
  console.log('storing user');
  if (user) {
    window.localStorage.setItem('user', JSON.stringify(user))
  }
  console.log('user object:');
  console.log(user);
  return user
}


export default { login }
