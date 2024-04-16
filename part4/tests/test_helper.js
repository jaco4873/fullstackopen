const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')


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

const addTestUser = async () => {
  const passwordHash = await bcrypt.hash('testPassword', 10)
  const testUser = new User({
    username: 'automatedtestuser',
    name: 'Automated Test User',
    passwordHash: passwordHash
  })
  await testUser.save()
  return testUser
}

const getTestUser = async () => {
  const testUser = await User.findOne({ username: 'automatedtestuser' })
  return testUser
}

const getTestUserToken = async () => {
  const testUser = await getTestUser()
  const userForToken = {
    username: testUser.username,
    id: testUser._id,
  }
  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60*60 })
  return token
}

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
  blogsInDb,
  usersInDb,
  addTestUser,
  getTestUser,
  getTestUserToken
}