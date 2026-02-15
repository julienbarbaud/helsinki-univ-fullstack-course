const AccountDisplay = ({ userState }) => {

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    userState.setUser(null)
  }

  return(
    <div className="account-container">
      <p className='userDisplay'>Welcome, {userState.user.name}</p>
      <button class="logout-button" onClick={handleLogout}>Log out</button>
    </div>
  )
}

export default AccountDisplay
