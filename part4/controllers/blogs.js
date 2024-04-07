const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const newPost = new Blog(request.body)

  try {
    const result = await newPost.save()
    response.status(201).json(result)
  } catch (error) {
    response.status(400).json({ error: error.message })
  }
})

module.exports = blogsRouter

