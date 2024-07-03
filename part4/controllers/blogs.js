const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const middleware = require("../utils/middleware")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
  response.status(200).json(blogs)
})

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const newBlog = new Blog({
    title: body.title,
    url: body.url,
    author: body.author,
    user: user,
    likes: body.likes,
  })

  const savedBlog = await newBlog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
      return response.status(404).json({ error: "blog not found" })
    }
    if (blog.user.toString() === user._id.toString()) {
      await Blog.findByIdAndDelete(request.params.id)
      response.status(204).end()
    } else {
      return response.status(401).json({
        error: "Unauthorized. Only authors can delete their entries.",
      })
    }
  },
)

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body
  console.log("body", body)
  console.log("user", request.user)

  const updatedBlog = {
    title: body.title,
    url: body.url,
    author: body.author,
    likes: body.likes,
    user: request.user,
  }

  const updatedDocument = await Blog.findByIdAndUpdate(
    request.params.id,
    updatedBlog,
    { new: true },
  )
  response.status(200).json(updatedDocument)
})

module.exports = blogsRouter
