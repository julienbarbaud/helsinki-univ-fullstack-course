import { useMutation, useQuery } from "@apollo/client/react";
import { authorQuery, editAuthorMutation } from "../queries";

const Authors = () => {
  const result = useQuery(authorQuery);
  const [submitChange, _] = useMutation(editAuthorMutation);

  if (result.loading) return <div>loading...</div>;
  if (result.error) return <div>error while fetching data</div>;

  const { allAuthors } = result.data;
  const handleChangeBirth = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    submitChange({
      variables: {
        name: formData.get("authorName"),
        setBornTo: Number(formData.get("authorBirth")),
      },
      refetchQueries: [{ query: authorQuery }],
    });
    event.target.reset();
  };

  return (
    <>
      <h2>Authors:</h2>
      <ul>
        {allAuthors.map(({ name, born, bookCount, id }) => (
          <li key={id}>
            {name} ({born ? born : "?"}) wrote {bookCount} book(s)
          </li>
        ))}
      </ul>
      <h3>Change birth year:</h3>
      <form onSubmit={handleChangeBirth}>
        <div>
          <select name="authorName">
            {allAuthors.map(({ name, id }) => (
              <option key={id} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>
            birth year:
            <input name="authorBirth" />
          </label>
        </div>
        <button type="submit">change author info</button>
      </form>
    </>
  );
};

export default Authors;
