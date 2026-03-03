import { Link, Routes, Route, Links } from "react-router-dom";
import Home from "./components/home";
import Books from "./components/books";
import Authors from "./components/authors";
import NewBook from "./components/NewBook";

const LinkStyle = { margin: "8px" };

function App() {
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
      <Link style={LinkStyle} to="/newBook">
        register book
      </Link>

      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/books" Component={Books} />
        <Route path="/authors" Component={Authors} />
        <Route path="newBook" Component={NewBook} />
      </Routes>
    </>
  );
}

export default App;
