const { test, expect, describe, beforeEach } = require('@playwright/test')
const { rootUser, login, getLoginElements, setupDatabase } = require('./test-utils')


describe('Login tests', () => {

  beforeEach(async ({ page, request }) => {
    await setupDatabase(page, request);
  })

  test('login form is shown', async ({ page }) => {
    const loginElements = getLoginElements(page)
    for (const element of Object.values(loginElements)){
      console.log(element);
      await expect(element).toBeVisible()
    }
  })

  test('login with wrong credentials fails and displays error', async ({ page }) => {
    // wrong login fails and displays error message
    const wrongPassword = 'wrong password';
    login(page, rootUser.username, wrongPassword);
    await expect(page.getByText(/error/i)).toBeVisible();
    await expect(page.getByText(`Welcome, ${rootUser.username}`)).not.toBeVisible();
    // the fields remain filled up
    await expect(page.getByLabel('username:')).toHaveValue(rootUser.username);
    await expect(page.getByLabel('password:')).toHaveValue(wrongPassword);
  })

  test('login with correct credentials works', async ({ page }) => {
    // correct login works:
    await login(page, rootUser.username, rootUser.password)
    await expect(page.getByText(`Welcome, ${rootUser.name}`)).toBeVisible();
    await expect(page.getByText(/error/i)).not.toBeVisible();
  })
})
