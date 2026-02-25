import api from "./api";

const authHeader = (user) => ({ Authorization: `Bearer ${user.token}` });

const blogApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllBlogs: build.query({
      query: () => "/blogs",
      providesTags: ["blogs"],
    }),
    postNewBlog: build.mutation({
      query: ({ user, blogData }) => ({
        url: "/blogs",
        method: "POST",
        body: blogData,
        headers: authHeader(user),
      }),
      invalidatesTags: ["blogs", "userList"],
    }),
    likeBlog: build.mutation({
      query: ({ user, blogId }) => ({
        url: `/blogs/${blogId}/likes`,
        method: "POST",
        headers: authHeader(user),
      }),
      invalidatesTags: ["blogs", "userList"],
    }),
    removeBlog: build.mutation({
      query: ({ user, blogId }) => ({
        url: `/blogs/${blogId}`,
        method: "DELETE",
        headers: authHeader(user),
      }),
      invalidatesTags: ["blogs", "userList"],
    }),
    postComment: build.mutation({
      query: ({ blogId, comment }) => ({
        url: `/blogs/${blogId}/comments`,
        method: "POST",
        body: comment,
      }),
      invalidatesTags: ["blogs"],
    }),
  }),
});

console.log(blogApi);

export const {
  useGetAllBlogsQuery,
  usePostNewBlogMutation,
  useLikeBlogMutation,
  useRemoveBlogMutation,
  usePostCommentMutation,
} = blogApi;

export default blogApi;
