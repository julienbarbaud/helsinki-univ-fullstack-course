import { loginMutation } from "../queries";
import { useMutation } from "@apollo/client/react";

const LoginView = ({ setAuthToken }) => {
  const [login] = useMutation(loginMutation);

  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const result = await login({
      variables: {
        username: formData.get("username"),
        password: formData.get("password"),
      },
    });
    const token = result.data.login;
    setAuthToken(token);
    window.localStorage.setItem("authentication-token", token);
    formData.set("username", "");
    formData.set("password", "");
  };
  return (
    <>
      <h2>Login:</h2>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleLogin}
      >
        <label>
          username:
          <input name="username"></input>
        </label>
        <label>
          password:
          <input name="password"></input>
        </label>
        <button style={{ width: "fit-content" }} type="submit">
          Log in
        </button>
      </form>
    </>
  );
};

export default LoginView;
