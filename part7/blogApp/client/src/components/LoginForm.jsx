import { showError } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";
import loginService from "../services/loginService";
import { setLocalUser } from "../reducers/userReducer";
import { useState } from "react";
import { TextField, Button } from "@mui/material";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const usernameChangeHandler = ({ target }) => setUsername(target.value);
  const passwordChangeHandler = ({ target }) => setPassword(target.value);
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login(username, password);
      if (user) {
        console.log("setting user");
        dispatch(setLocalUser(user));
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      console.log("failed authentication");
      dispatch(showError("failed authentication"));
      console.log(error);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <TextField
        label="username"
        value={username}
        onChange={usernameChangeHandler}
      />
      <TextField
        label="password"
        type="password"
        value={password}
        onChange={passwordChangeHandler}
      />
      <Button type="submit">Log in</Button>
    </form>
  );
};

export default LoginForm;
