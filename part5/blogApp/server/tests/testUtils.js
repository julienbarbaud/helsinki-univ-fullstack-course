const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

const { hash } = require('bcrypt');
const User = require('../models/user');
const Blog = require('../models/blog');
const { CRYPTO_SALT_ROUNDS } = require('../utils/config');

const loginInfo = [
  {
    username: 'root',
    password: 'pwd1',
  },
  {
    username: 'user1',
    password: 'pwd2',
  },
];

const hashUsers = async () => [
  {
    username: loginInfo[0].username,
    name: 'Odin',
    password: await hash(loginInfo[0].password, CRYPTO_SALT_ROUNDS),
  },
  {
    username: loginInfo[1].username,
    name: 'Loki',
    password: await hash(loginInfo[1].password, CRYPTO_SALT_ROUNDS),
  },
];

const initialBlogs = [
  {
    title: 'I was here',
    url: 'www.fakeurl4me.com',
  },
  {
    title: 'you was here',
    url: 'www.fakeurl4u.com',
  },
  {
    title: 'he was here',
    likes: 25,
    url: 'www.fakeurl4him.com',
  },
];

const initializeDB = async () => {
  // clear test db:
  await User.deleteMany({});
  await Blog.deleteMany({});

  // register users:
  const initialUsers = await hashUsers();
  let savePromises = initialUsers.map((user) => new User(user).save());
  let returnedUsers = await Promise.all(savePromises);

  const userIds = returnedUsers.map((user) => user.id);
  const getRandomAuthor = () => userIds[Math.floor(Math.random() * userIds.length)];
  savePromises = initialBlogs.map((blog) => new Blog({
    ...blog,
    author: getRandomAuthor(),
  }).save());
  const returnedBlogs = await Promise.all(savePromises);

  // updating the users
  savePromises = returnedBlogs.map(async (blog) => User.findByIdAndUpdate(
    blog.author,
    { $push: { posts: blog.id } },
    { new: true },
  ));
  returnedUsers = await Promise.all(savePromises);
  return { users: returnedUsers, blogs: returnedBlogs };
};

const login = async (api, { username, password }) => {
  const user = await User.findOne({ username });
  const { text: token } = await api
    .post('/api/login')
    .send({ username, password })
    .expect(200)
    .expect('Content-type', /text/);
  return { user, token };
};

module.exports = {
  initializeDB,
  blogs,
  loginInfo,
  login,
};
