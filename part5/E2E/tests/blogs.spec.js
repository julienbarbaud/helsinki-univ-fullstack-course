const { test, describe, expect, beforeEach } = require('@playwright/test')
const utils = require('./test-utils')

describe('When logged in', () => {
  beforeEach(async ({ page, request })=> {
    await utils.setupDatabase(page, request);
    await utils.login(page, utils.rootUser.username, utils.rootUser.password);
  })

  test('can create new blog', async ({ page }) => {
    await utils.postBlog(page, utils.firstBlog);
    // expect the blog to be displayed in the table
    await expect(page.getByRole('table').getByText(utils.firstBlog.title)).toBeVisible();
  })

  describe('When a blog has been posted', () => {
    beforeEach(async ({ page }) => utils.postBlog(page, utils.firstBlog));

    test('can like the blog', async ({ page }) => {
      const blogEntry = await utils.showBlogDetailsByTitle(page, utils.firstBlog.title);
      const likeDisplay = blogEntry.getByText(/likes:/i);
      await expect(likeDisplay).toHaveText('likes: 0');
      const likes = 3;
      for (let i=0; i<=3; i++) {
        await blogEntry.getByRole('button', { name: 'like' }).click();
        await expect(likeDisplay).toHaveText(`likes: ${i}`);
      }
    })

    test('can delete a blog posted by the user', async ({ page }) => {
      const blogEntry = await utils.showBlogDetailsByTitle(page, utils.firstBlog.title);
      await blogEntry.getByRole('button', { name: 'remove' }).click()
      await expect(blogEntry).not.toBeVisible();
    })

    describe('when logged in as non-author', () => {
      test('cannot see the remove button', async ({ page }) => {
        // logout first:
        await page.getByText(/Log ?out/i).click();
        await utils.login(page, utils.otherUser.username, utils.otherUser.password);
        const blogEntry = await utils.showBlogDetailsByTitle(page, utils.firstBlog.title);
        // checking that details are visible:
        expect(blogEntry.getByText(/url:/i)).toBeVisible();
        // but not the remove button:
        expect(blogEntry.getByRole('button', { name: 'remove'})).not.toBeVisible();
      })
    });
  });

  describe('when multiple blogs are present with random likes', () => {
    beforeEach(async ({ page }) => {
      for (const blog of utils.otherBlogs){
        await utils.postBlog(page, blog);
        await expect(page.getByLabel('title:')).toHaveValue('');
      }

      // open all blog entries' details
      for (const blog of utils.otherBlogs) {
        await utils.showBlogDetailsByTitle(page, blog.title)
      }

      const expectedLikes = Array(utils.otherBlogs.length).fill(0);
      const selectRandomPost = () => {
        const idx = Math.floor(Math.random()*utils.otherBlogs.length);
        const entry = page.locator('.blog-row').getByText(utils.otherBlogs[idx].title).locator('../..');
        return [entry, ++expectedLikes[idx]];
      }
      for (let i=0; i<15; i++) {
        // select random blog post:
        const [blogEntry, expectedLikesValue] = selectRandomPost();
        // like and wait for correct display
        await blogEntry.getByRole('button', { name: 'like' }).click();
        const likeDisplay = blogEntry.getByText(/likes:/i);
        await expect(likeDisplay).toHaveText(`likes: ${expectedLikesValue}`, { timeout: 10000});
      }
    });

    test('blogs are ordered by likes', async ({ page }) => {
      const blogEntries = await page.locator('.blog-row').all()
      let prevPostLikes = 100;
      let likes;
      for (const entry of blogEntries) {
        likes = (await entry.getByText(/likes:/).textContent()).split(' ')[1];
        console.log(likes);
        await page.pause();
        expect(Number(likes)).toBeLessThanOrEqual(prevPostLikes);
        prevPostLikes = Number(likes);
      }
    })
  });
});
