import loginService from "../services/loginService"

const LoginForm = ({ userLoginInfo, userState, setNotif }) => {
  const usernameChangeHandler = (event) => userLoginInfo.setUsername(event.target.value)
  const passwordChangeHandler = (event) => userLoginInfo.setPassword(event.target.value)
  const submitHandler = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(userLoginInfo.username, userLoginInfo.password)
      if (user) {
        console.log('setting user');
        userState.setUser(user)
        userLoginInfo.setUsername('')
        userLoginInfo.setPassword('')
      }
    } catch (error) {
      console.log("failed authentication")
      console.log(error);
      setNotif({
        message: 'Authentication failed',
        isError: true,
      })
    }
  }

  return(
    <form onSubmit={submitHandler}>
      <div>
        <label>username:
          <input value={userLoginInfo.username} onChange={usernameChangeHandler}></input>
        </label>
      </div>
      <div>
        <label>password:
          <input type="password" value={userLoginInfo.password} onChange={passwordChangeHandler}/>
        </label>
      </div>
      <button type="submit">Log in</button>
    </form>
  )
}

export default LoginForm
