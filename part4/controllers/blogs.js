const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 } )
  response.status(200).json(blogs)
})


blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const newBlog = new Blog({
    title: body.title,
    url: body.url,
    author: body.author,
    user: user,
    likes: body.likes
  })

  const savedBlog = await newBlog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const userid = decodedToken.id
  const blog = await Blog.findById(request.params.id)

  if ( !blog ) {
    return response.status(404).json({ error: 'blog not found' })
  }
  console.log('blog retrieved',blog)
  console.log('userid', userid )
  if ( blog.user.toString() === userid.toString() ) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }
  else {
    return response.status(401).json({ error: 'unauthorized' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const updatedBlog = {
    title: body.title,
    url: body.url,
    author: body.author,
    likes: body.likes
  }

  const updatedDocument = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
  response.status(200).json(updatedDocument)
})

module.exports = blogsRouter