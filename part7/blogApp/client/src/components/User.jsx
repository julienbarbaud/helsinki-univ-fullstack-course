import { useParams } from "react-router-dom";
import { useGetAllUsersQuery } from "../services/usersApi";

const User = () => {
  const { data: users, isLoading } = useGetAllUsersQuery();
  const { id } = useParams();

  if (isLoading) return <div>loading</div>;

  const user = users.find((user) => user.id === id);

  return (
    <>
      <h4>{user.name}</h4>
      <b>Added blogs</b>
      <ul>
        {user.posts.map(({ id, title }) => (
          <li key={id}>{title}</li>
        ))}
      </ul>
    </>
  );
};

export default User;
