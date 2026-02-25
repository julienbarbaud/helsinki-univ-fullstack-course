import { useSelector } from "react-redux";

const Notification = () => {
  const notif = useSelector((state) => state.notification);

  if (!notif.message) return null;

  const message = (notif.isError ? "Error: " : "") + notif.message;

  return (
    <div
      className="notif-container"
      is-error={notif.isError ? "true" : undefined}
    >
      <p className="notif-message">{message}</p>
    </div>
  );
};

export default Notification;
