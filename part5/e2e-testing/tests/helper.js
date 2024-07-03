const loginWith = async (page, username, password) => {
  await page.getByTestId("username").fill(username)
  await page.getByTestId("password").fill(password)
  await page.getByTestId("loginbutton").click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole("button", { name: "new blog" }).click()
  await page.getByPlaceholder("write title here").click()
  await page.getByPlaceholder("write title here").fill(title)
  await page.getByPlaceholder("write title here").press("Tab")
  await page.getByPlaceholder("write author here").fill(author)
  await page.getByPlaceholder("write author here").press("Tab")
  await page.getByPlaceholder("write url here").click()
  await page.getByPlaceholder("write url here").fill(url)
  await page.getByRole("button", { name: "create" }).click()
}

const createExtraBlog = async (page, title, author, url) => {
  await page.getByPlaceholder("write title here").click()
  await page.getByPlaceholder("write title here").fill(title)
  await page.getByPlaceholder("write title here").press("Tab")
  await page.getByPlaceholder("write author here").fill(author)
  await page.getByPlaceholder("write author here").press("Tab")
  await page.getByPlaceholder("write url here").click()
  await page.getByPlaceholder("write url here").fill(url)
  await page.getByRole("button", { name: "create" }).click()
}

const waitForBlogCreation = async (page, url) => {
  await page.waitForResponse(
    (response) => response.url().includes(url) && response.status() === 200,
  )
}

export { loginWith, createBlog, createExtraBlog, waitForBlogCreation }
