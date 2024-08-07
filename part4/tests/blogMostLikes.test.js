const { test, describe } = require("node:test")
const assert = require("node:assert")
const listHelper = require("../utils/list_helper")
const listOfBlogs = require("../utils/blog_list").listOfBlogs

describe("total likes of list of blogposts", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ]

  const listWithAllBlogs = listOfBlogs

  test("of empty list is zero", () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test("when list has three blogs, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithAllBlogs)
    assert.strictEqual(result, 36)
  })
})
