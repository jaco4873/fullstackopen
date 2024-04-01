const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const listOfBlogs = require('../utils/blog_list').listOfBlogs

// Assuming listHelper.mostBlogs returns an object with authors as keys and the count of their blogs as values
describe('most likes', () => {
  const blogs = listOfBlogs

  test('most blog of an empty list', () => {
    const result = listHelper.authorMostLikes([])
    assert.deepStrictEqual(result, null)
  })

  test('most blog from list of blogs', () => {
    const result = listHelper.authorMostLikes(blogs)
    assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 17 })
  })
})
