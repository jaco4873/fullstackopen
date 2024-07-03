const { test, describe } = require("node:test")
const assert = require("node:assert")
const listHelper = require("../utils/list_helper")
const listOfBlogs = require("../utils/blog_list").listOfBlogs

// Assuming listHelper.mostBlogs returns an object with authors as keys and the count of their blogs as values
describe("author with most likes", () => {
  const blogs = listOfBlogs

  test("most likes from an empty list is null", () => {
    const result = listHelper.authorMostLikes([])
    assert.deepStrictEqual(result, null)
  })

  test("Author with most total likes from list of blogs", () => {
    const result = listHelper.authorMostLikes(blogs)
    assert.deepStrictEqual(result, { author: "Edsger W. Dijkstra", likes: 17 })
  })
})
