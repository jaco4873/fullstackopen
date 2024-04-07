const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

describe('when there are initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
      .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(e => e.title)
    assert(titles.includes('blogtest'))
  })

  describe('addition of a new blog', () => {
    test('succeeds with valid data', async () => {
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

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map(n => n.title)
      assert(titles.includes(newBlog.title))
    })

    test('defaults to 0 likes if not specified', async () => {
      const newBlog = {
        title: 'this post does not have any likes defined',
        author: 'Jacob',
        url: 'http://jbl.com'
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')
      const addedBlog = response.body.find(b => b.title === newBlog.title)
      assert.strictEqual(addedBlog.likes, 0)
    })

    test('fails with status code 400 if data is invalid (no title)', async () => {
      const newBlog = {
        author: 'Jacob',
        url: 'http://jbl.com',
        likes: 100
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test('fails with status code 400 if data is invalid (no url)', async () => {
      const newBlog = {
        title: 'this post does not have a url defined',
        author: 'Jacob',
        likes: 100
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
  })

  describe('deletion of a blog post', () => {
    test('a blogpost can be deleted', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      const titles = blogsAtEnd.map(b => b.title)
      assert(!titles.includes(blogToDelete.title))

      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
    })
  })

  describe('verifying the id property', () => {
    test('unique identifier property of the blog posts is named id', async () => {
      const response = await api.get('/api/blogs')

      response.body.forEach(blogPost => {
        assert.strictEqual(typeof blogPost.id, 'string')
        assert.strictEqual(blogPost._id, undefined)
      })
    })
  })

  test('update blog with valid data', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogId = blogsAtStart[0].id

    const blogUpdate = {
      likes: 2000
    }

    const response = await api.put(`/api/blogs/${blogId}`)
      .send(blogUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const updatedBlog = response.body
    console.log('Updated entry:', updatedBlog)
    assert.strictEqual(updatedBlog.likes, blogUpdate.likes)
  })

  after(async () => {
    await mongoose.connection.close()
  })
})