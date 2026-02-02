const Notification = ({ message }) => {
    if (message === null) return null
    const {text, isError} = message
    const type = isError ? "error" : "success"
    console.log(text)
    return <div className="notif" type={type}><h3 className="notifText" type={type}>{text}</h3></div>
}

export default Notification