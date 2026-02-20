import { useSelector } from "react-redux"

const Notification = () => {
  const message = useSelector((state) => state.notification)
  if (message !== null){
    const displayedCharacters = 70;
    const messageDisplay = message.length > displayedCharacters ? message.slice(0, displayedCharacters) + "..." : message
    return (message !== null) && <div className="notif">{messageDisplay}</div>;
  } else {
    return null
  }

}

export default Notification
