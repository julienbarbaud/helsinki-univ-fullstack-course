import { useGetAllUsersQuery } from "../services/usersApi";
import { Link } from "react-router-dom";

const UserList = () => {
  const usersQuery = useGetAllUsersQuery();

  if (usersQuery.isLoading) {
    return <div>Loading...</div>;
  }

  console.log(usersQuery.data[0]);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Blogs posted</th>
        </tr>
      </thead>
      <tbody>
        {usersQuery.data.map((user) => (
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>
                {user.name} ({user.username})
              </Link>
            </td>
            <td>{user.posts.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserList;
