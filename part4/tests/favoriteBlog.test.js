const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const listOfBlogs = require('../utils/blog_list').listOfBlogs

describe('Most likes from a list of blogs', () => {
  const blogs = listOfBlogs

  test('favorite blog of an empty list', () => {
    const result = listHelper.favoriteBlog([])
    assert.strictEqual(result, null)
  })

  test('favorite blog of a list', () => {
    const result = listHelper.favoriteBlog(blogs)
    assert.strictEqual(result.likes, blogs[2].likes)
  })
})