import { useQuery } from "@apollo/client/react";
import { booksQuery } from "../queries";
import { useState } from "react";

const FilterButton = ({ genre, setFilter }) => {
  return <button onClick={() => setFilter(genre)}>{genre}</button>;
};

const Books = () => {
  const result = useQuery(booksQuery);
  const [filter, setFilter] = useState(null);

  if (result.loading) return <div>loading...</div>;
  if (result.error) return <div>error fetching data</div>;

  const books = result.data.allBooks;
  const genres = new Set(books.flatMap((book) => book.genres));
  const displayedBooks = filter
    ? books.filter(({ genres }) => genres.includes(filter))
    : books;

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {displayedBooks.map(({ title, author, published, id }) => (
            <tr key={id}>
              <td>{title}</td>
              <td>{author.name}</td>
              <td>{published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {Array.from(genres).map((genre) => (
        <FilterButton key={genre} genre={genre} setFilter={setFilter} />
      ))}
      <button onClick={() => setFilter(null)}>all genres</button>
    </>
  );
};

export default Books;
