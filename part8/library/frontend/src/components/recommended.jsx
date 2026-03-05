import { userQuery, booksQuery } from "../queries";
import { useQuery } from "@apollo/client/react";

const Recommended = () => {
  // N.B: favorite genre per user is not required. If favorite genre = null, we recommend every book
  const { data, loading, error } = useQuery(userQuery);
  const {
    data: bookData,
    loading: bookLoading,
    berror: bookError,
  } = useQuery(booksQuery, {
    variables: { genre: data?.me?.favoriteGenre },
    skip: !data?.me,
  });

  if (loading) return "loading...";
  if (error) return "error, sorry";

  return (
    <>
      <h3>Hi {data.me.username}, we think you might like these books:</h3>
      {bookLoading && <p>loading books...</p>}
      {bookError && <p>Failed to get books</p>}
      {!(bookError || bookLoading) && (
        <ul>
          {bookData.allBooks.map((book) => (
            <li key={book.id}>{book.title}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Recommended;
