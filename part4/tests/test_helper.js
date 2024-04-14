const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'blogtest',
    author: 'blog author',
    url: 'http://blog.com',
    likes: 20
  },
  {
    title: 'blogtest2',
    author: 'blog author2',
    url: 'http://blog2.com',
    likes: 25
  },
]


const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb
}