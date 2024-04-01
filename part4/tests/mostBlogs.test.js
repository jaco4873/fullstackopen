const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const listOfBlogs = require('../utils/blog_list').listOfBlogs

// Assuming listHelper.mostBlogs returns an object with authors as keys and the count of their blogs as values
describe('most blogs', () => {
  const blogs = listOfBlogs

  test('most blog of an empty list', () => {
    const result = listHelper.mostBlogs([])
    assert.strictEqual(result, null)
  })

  test('most blog from list of blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result, { author: 'Robert C. Martin', blogs: 3 })
  })
})
