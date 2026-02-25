import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import AccountDisplay from "./components/AccountDisplay";
import Notification from "./components/Notification";
import { useSelector } from "react-redux";
import { Routes, Route, Link } from "react-router-dom";
import UserList from "./components/UserList";
import User from "./components/User";
import Blog from "./components/Blog";
import { AppBar, Toolbar, Button } from "@mui/material";

function App() {
  const user = useSelector((state) => state.user);
  return (
    <>
      <AppBar>
        <div className="appbar-container">
          <div>
            <h1 className="app-title">Blog app</h1>
            <Toolbar>
              <Button color="inherit" component={Link} to="/">
                blogs
              </Button>
              <Button color="inherit" component={Link} to="/users">
                users
              </Button>
            </Toolbar>
          </div>
          <AccountDisplay color="inherit" className="account-display" />
        </div>
      </AppBar>

      <Notification />
      {!user && <LoginForm />}
      {user && (
        <Routes>
          <Route path="/" Component={BlogList} />
          <Route path="/users" Component={UserList} />
          <Route path="/users/:id" Component={User} />
          <Route path="/:id" Component={Blog} />
        </Routes>
      )}
    </>
  );
}

export default App;
