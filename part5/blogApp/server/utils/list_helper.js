const dummy = () => 1;

const totalLikes = (blogs) => blogs.reduce((likes, blog) => likes + blog.likes, 0);

const favoriteBlog = (blogs) => (blogs.length === 0 ? null : blogs.reduce(
  (favorite, blog) => (blog.likes > favorite.likes ? blog : favorite),
));

const mostBlogs = (blogs) => {
  // creating a hashmap of authors with their blog count
  const authorMap = new Map();
  if (blogs.length === 0) return null;
  blogs.forEach(({ author }) => {
    authorMap.set(author, (authorMap.get(author) || 0) + 1);
  });
  // holder for the author with most blogs
  const maxAuthor = {
    name: 'unknown',
    blogs: 0,
  };
  // getting the max from the map:
  authorMap.forEach((value, key) => {
    console.log(key, value);
    if (value > maxAuthor.blogs) {
      maxAuthor.name = key;
      maxAuthor.blogs = value;
    }
  });
  return maxAuthor;
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;
  // using a functional programming approach to change things up
  const authorMap = blogs.reduce(
    (map, { author, likes }) => {
      map.set(author, (map.get(author) || 0) + likes);
      return map;
    },
    new Map(),
  );

  return [...authorMap.entries()].reduce(
    (maxAuth, [name, likes]) => (likes > maxAuth.likes ? { name, likes } : maxAuth),
    { name: '', likes: 0 },
  );
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
