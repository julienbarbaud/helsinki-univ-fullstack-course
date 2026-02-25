import PostForm from "./PostForm";
import Togglable from "./Togglable";
import BlogRow from "./BlogRow";
import { useGetAllBlogsQuery } from "../services/blogApi";
import { Typography } from "@mui/material";

const BlogList = () => {
  const blogQuery = useGetAllBlogsQuery();

  if (blogQuery.isLoading) {
    return <div>loading...</div>;
  } else if (blogQuery.isError) {
    return <div>Error fetching blogs</div>;
  }

  const blogs = blogQuery.data;

  //sorting blogs by likes
  console.log("blogs: ", blogs[0].likes);
  const sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes);
  return (
    <div>
      <Typography style={{ marginBottom: "15px" }} variant="h2">
        Blogs
      </Typography>
      <Togglable toggleText="create new blog" hideText="cancel">
        <div className="post-form-container">
          <PostForm />
        </div>
      </Togglable>
      <table className="blog-table">
        {sortedBlogs.map((blog) => (
          <BlogRow key={blog.id} blog={blog} />
        ))}
      </table>
    </div>
  );
};

export default BlogList;
