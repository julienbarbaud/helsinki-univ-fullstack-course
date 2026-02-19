import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import AccountDisplay from './components/AccountDisplay'
import Notification from './components/Notification'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notif, setNotif] = useState(null)

  const userLoginInfo = { username, setUsername, password, setPassword }
  const userState = { user, setUser }

  useEffect(() => {
    const storedUserData = window.localStorage.getItem('user')
    if (storedUserData){
      const storedUser = JSON.parse(storedUserData)
      setUser(storedUser)
    }
  }, [])

  return (
    <>
      <Notification notif={notif} setNotif={setNotif}/>
      <h1>Blog app</h1>
      {(!user && <LoginForm userLoginInfo={userLoginInfo} userState={userState} setNotif={setNotif}/>)}
      {(user && <AccountDisplay userState={userState}/>)}
      {(user && <BlogList user={user} setNotif={setNotif}/>)}
    </>
  )
}

export default App
