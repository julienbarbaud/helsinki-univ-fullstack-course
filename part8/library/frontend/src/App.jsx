import { Link, Routes, Route, Links } from "react-router-dom";
import { useState } from "react";
import { useApolloClient, useSubscription } from "@apollo/client/react";
import Home from "./components/home";
import Books from "./components/books";
import Authors from "./components/authors";
import NewBook from "./components/NewBook";
import LoginView from "./components/loginView";
import Recommended from "./components/recommended";
import { bookAdded } from "./queries";

const LinkStyle = { margin: "8px" };

function App() {
  const [authToken, setAuthToken] = useState(
    window.localStorage.getItem("authentication-token"),
  );
  const client = useApolloClient();

  useSubscription(bookAdded, {
    onData: ({ data }) => {
      window.alert(`added new book ${data.data.bookAdded.title}`);
    },
  });

  const logout = () => {
    setAuthToken(null);
    window.localStorage.removeItem("authentication-token");
    client.resetStore();
  };

  return (
    <>
      <Link style={LinkStyle} to="/">
        home
      </Link>
      <Link style={LinkStyle} to="/books">
        books
      </Link>
      <Link style={LinkStyle} to="/authors">
        authors
      </Link>
      {authToken && (
        <Link style={LinkStyle} to="/newBook">
          register book
        </Link>
      )}
      {authToken && (
        <Link style={LinkStyle} to="/recommended">
          recommended
        </Link>
      )}
      {authToken && (
        <Link style={LinkStyle} onClick={logout}>
          log out
        </Link>
      )}
      {!authToken && (
        <Link style={LinkStyle} to="/login">
          login
        </Link>
      )}

      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/books" Component={Books} />
        <Route path="/authors" Component={Authors} />
        {authToken && <Route path="/newBook" Component={NewBook} />}
        {authToken && <Route path="/recommended" Component={Recommended} />}
        {!authToken && (
          <Route
            path="/login"
            element={<LoginView setAuthToken={setAuthToken}></LoginView>}
          />
        )}
      </Routes>
    </>
  );
}

export default App;
