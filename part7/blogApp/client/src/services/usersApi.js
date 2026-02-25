import api from "./api";

const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query({
      query: () => "/users",
      providesTags: ["userList"],
    }),
  }),
});

console.log(usersApi);

export const { useGetAllUsersQuery } = usersApi;

export default usersApi;
