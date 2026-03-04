import { useQuery } from "@apollo/client/react";
import { booksQuery } from "../queries";

const Books = () => {
  const result = useQuery(booksQuery);

  if (result.loading) return <div>loading...</div>;
  if (result.error) return <div>error fetching data</div>;

  return (
    <table>
      <thead>
        <tr>
          <th>title</th>
          <th>author</th>
          <th>published</th>
        </tr>
      </thead>
      <tbody>
        {result.data.allBooks.map(({ title, author, published, id }) => (
          <tr key={id}>
            <td>{title}</td>
            <td>{author.name}</td>
            <td>{published}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Books;
