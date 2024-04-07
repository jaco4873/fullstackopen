const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('blog api', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two blogposts', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('blogtitles include blogtest', async () => {
    const response = await api.get('/api/blogs')

    const title = response.body.map(e => e.title)
    assert(title.includes('blogtest'))
  })

  test('a valid blogpost can be added and is saved correctly ', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Jacob',
      url: 'http://jbl.com',
      likes: 100
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)

    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
    assert(titles.includes('async/await simplifies making async calls'))
  })

  test('a blogpost with likes defaults to 0 likes', async () => {
    const newBlog = {
      title: 'this post does not have any likes defined',
      author: 'Jacob',
      url: 'http://jbl.com'
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, 0)
  })

  test('blog without title is not added, but causes 400', async () => {
    const newBlog = {
      author: 'Jacob',
      url: 'http://jbl.com',
      likes: 100
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('blog without url is not added, but causes 400', async () => {
    const newBlog = {
      title: 'this post does not have a url',
      author: 'Jacob',
      likes: 50
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(blogPost => {
      assert.strictEqual(blogPost.id !== undefined, true)
      assert.strictEqual(blogPost._id, undefined)
    })
  })

  after(async () => {
    await mongoose.connection.close()
  })
})