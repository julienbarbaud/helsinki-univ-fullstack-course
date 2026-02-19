const rootUser = {
  username: 'root',
  name: 'Odin',
  password: '12345',
}

const otherUser = {
  username: 'random_dude_69',
  name: 'Loki',
  password: "R4gn4r0ck'n'r0ll",
}

const firstBlog = {
  title: '1st blog',
  url: 'http://www.fiiiiiirst.com',
}

const otherBlogs = [
    {
    title: '2nd blog',
    url: 'wdcqwqv'
  },
    {
    title: '3rd blog',
    url: 'wdcqwqv'
  },
    {
    title: '4th blog',
    url: 'wdcqwqv'
  },
    {
    title: '5th blog',
    url: 'wdcqwqv'
  },
]

const setupDatabase = async (page, request) => {
  // clear database:
  await request.post('/api/testing/reset');
  await request.post('/api/users', { data: rootUser });
  await request.post('/api/users', { data: otherUser });
  await page.goto('/');
}

const getLoginElements = (page) => {
  const nameInput = page.getByLabel('username:')
  const passwordInput = page.getByLabel('password:')
  const button = page.getByRole('button', {name: 'log in'})
  return { nameInput, passwordInput, button }
}

const login = async (page, username, password) => {
  // login assuming initially empty fields
  const { nameInput, passwordInput, button } = getLoginElements(page);
  await nameInput.fill(username);
  await passwordInput.fill(password);
  await button.click();
}

const postBlog = async (page, blog) => {
  if (!await page.getByLabel('title:').isVisible()) {
    await page.getByText('create new blog').click();
  }
  await page.getByLabel('title:').fill(blog.title);
  await page.getByLabel('url').fill(blog.url);
  await page.getByText('post blog').click();
}

const showBlogDetailsByTitle = async (page, title) => {
  const blogEntry = page.getByRole('table').getByText(title).locator('../..');
  await blogEntry.getByText('view details').click();
  return blogEntry;
}

module.exports = {
  rootUser,
  otherUser,
  firstBlog,
  otherBlogs,
  setupDatabase,
  getLoginElements,
  login,
  postBlog,
  showBlogDetailsByTitle,
}
