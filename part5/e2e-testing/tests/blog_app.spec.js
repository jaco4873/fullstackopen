const { test, describe, expect, beforeEach } = require("@playwright/test")
const {
  loginWith,
  createBlog,
  createExtraBlog,
  waitForBlogCreation,
} = require("./helper")
const exp = require("constants")

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset")
    await request.post("/api/users", {
      data: {
        username: "testuser",
        name: "testuser",
        password: "testpw",
      },
    })

    await page.goto("/")
  })

  test("login form is shown", async ({ page }) => {
    await expect(page.getByText("log in to application")).toBeVisible()
  })

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "testuser", "testpw")
      await expect(page.getByText("testuser logged in")).toBeVisible()
    })

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "wrong", "wrong")

      await expect(page.getByText("wrong username or password")).toBeVisible()
    })
  })

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "testuser", "testpw")
    })

    test("A blog can be created", async ({ page }) => {
      await createBlog(
        page,
        "Testing Creating A New Blog",
        "testuser",
        "http://testurl.com",
      )
      await expect(
        page.getByText(
          "A new blog Testing Creating A New Blog by testuser added",
        ),
      ).toBeVisible()
      await expect(
        page.getByText("Testing Creating A New Blog testuser"),
      ).toBeVisible()
    })

    test("A blog can be liked", async ({ page }) => {
      await createBlog(
        page,
        "Testing Creating A New Blog",
        "testuser",
        "http://testurl.com",
      )
      await page.getByTestId("blogViewButton").click()
      await page.getByRole("button", { name: "like" }).click()
      await expect(page.getByText("Likes: 1")).toBeVisible()
    })

    test("A blog can be deleted", async ({ page }) => {
      page.on("dialog", async (dialog) => {
        expect(dialog.type()).toContain("confirm")
        expect(dialog.message()).toContain(
          "Remove blog Testing Creating A New Blog by testuser",
        )
        await dialog.accept()
      })

      await createBlog(
        page,
        "Testing Creating A New Blog",
        "testuser",
        "http://testurl.com",
      )
      await page.getByTestId("blogViewButton").click()
      await page.getByRole("button", { name: "remove" }).click()
      await expect(page.getByTestId("blogPost")).not.toBeVisible()
    })

    test("Only the user who added a blog can see the delete button", async ({
      page,
      request,
    }) => {
      await request.post("/api/users", {
        data: {
          username: "secondarytestuser",
          name: "secondarytestuser",
          password: "testpw2",
        },
      })

      page.on("dialog", async (dialog) => {
        expect(dialog.type()).toContain("confirm")
        expect(dialog.message()).toContain(
          "Remove blog Testing Creating A New Blog by testuser",
        )
        await dialog.accept()
      })

      await createBlog(
        page,
        "Testing Creating A New Blog",
        "testuser",
        "http://testurl.com",
      )
      await page.getByRole("button", { name: "logout" }).click()

      await loginWith(page, "secondarytestuser", "testpw2")
      await page.getByTestId("blogViewButton").click()
      await expect(
        page.getByRole("button", { name: "remove" }),
      ).not.toBeAttached()
    })

    test("Blogs are ordered by likes", async ({ page }) => {
      await createBlog(
        page,
        "Testing Creating A New Blog",
        "testuser",
        "http://testurl.com",
      )
      await waitForBlogCreation(page, "/api/blogs")

      await createExtraBlog(
        page,
        "Testing Creating A New Blog 2",
        "testuser",
        "http://testurl2.com",
      )
      await waitForBlogCreation(page, "/api/blogs")

      await createExtraBlog(
        page,
        "Testing Creating A New Blog 3",
        "testuser",
        "http://testurl3.com",
      )
      await waitForBlogCreation(page, "/api/blogs")

      const viewButtons = await page.getByTestId("blogViewButton").all()
      expect(viewButtons.length).toBe(3)

      for (const button of viewButtons) {
        await button.click()
      }

      const likeButtons = await page.getByRole("button", { name: "like" }).all()

      await likeButtons[2].click()
      await page.waitForTimeout(500)
      expect(page.getByTestId("blogPost").first()).toContainText(
        "Testing Creating A New Blog 3",
      )

      await likeButtons[2].click()
      await page.waitForTimeout(500)
      expect(page.getByTestId("blogPost").first()).toContainText(
        "Testing Creating A New Blog 2",
      )
    })
  })
})
