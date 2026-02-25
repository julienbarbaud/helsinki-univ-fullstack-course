import { useDispatch, useSelector } from "react-redux";
import { setLocalUser } from "../reducers/userReducer";
import { Button } from "@mui/material";

const AccountDisplay = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  if (!user) return null;

  const handleLogout = () => {
    window.localStorage.removeItem("user");
    dispatch(setLocalUser(null));
  };

  return (
    <div className="account-container">
      <p className="userDisplay">Welcome, {user.name}</p>
      <Button color="inherit" className="logout-button" onClick={handleLogout}>
        Log out
      </Button>
    </div>
  );
};

export default AccountDisplay;
