const Notification = ({ notif, setNotif }) => {
  if (notif === null)
    return null

  const message = (notif.isError? "Error: " : "") + notif.message

  // built-in timeout to hide the notif
  setTimeout(
    () => setNotif(null),
    3000,
  )

  return(
    <div className="notif-container" is-error={notif.isError? "true" : undefined}>
      <p className="notif-message">{message}</p>
    </div>
  )
}

export default Notification
