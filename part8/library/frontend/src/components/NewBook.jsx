import { useMutation } from "@apollo/client/react";
import { createBookMutation, authorQuery, booksQuery } from "../queries";
import { useState } from "react";

const NewBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [curGenre, setCurGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [postBook, _] = useMutation(createBookMutation, {
    refetchQueries: [{ query: authorQuery }, { query: booksQuery }],
  });

  const handleNewBook = (event) => {
    event.preventDefault();
    console.log("new book submitted");
    postBook({
      variables: { title, author, published: Number(published), genres },
    });
    setAuthor("");
    setGenres([]);
    setPublished("");
    setTitle("");
    setCurGenre("");
  };

  const handleNewGenre = () => {
    setGenres(genres.concat(curGenre));
  };

  const handleGenreEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setCurGenre("");
      handleNewGenre();
    }
  };

  return (
    <form onSubmit={handleNewBook}>
      <div>
        <label>
          title:
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </label>
      </div>
      <div>
        <label>
          author:
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          ></input>
        </label>
      </div>
      <div>
        <label>
          published:
          <input
            value={published}
            onChange={(e) => setPublished(e.target.value)}
          ></input>
        </label>
      </div>
      <div>
        <input
          value={curGenre}
          onChange={(e) => setCurGenre(e.target.value)}
          onKeyDown={handleGenreEnter}
        ></input>
        <button type="button" onClick={handleNewGenre}>
          add genre
        </button>
        <p>genres: {genres.join(", ")}</p>
      </div>
      <button type="submit">register book</button>
    </form>
  );
};

export default NewBook;
