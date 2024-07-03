const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  const favoriteBlog = blogs.reduce(
    (favorite, blog) => (favorite.likes > blog.likes ? favorite : blog),
    blogs[0],
  )

  return {
    title: favoriteBlog.title,
    author: favoriteBlog.author,
    likes: favoriteBlog.likes,
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const authorWithCount = blogs.reduce((authorCountObject, blog) => {
    authorCountObject[blog.author] = (authorCountObject[blog.author] || 0) + 1
    return authorCountObject
  }, {})

  const maxCount = Math.max(...Object.values(authorWithCount))

  const authorWithMaxCount = Object.keys(authorWithCount).find(
    (author) => authorWithCount[author] === maxCount,
  )

  return {
    author: authorWithMaxCount,
    blogs: maxCount,
  }
}

const authorMostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const authorWithLikes = blogs.reduce((authorLikesObject, blog) => {
    authorLikesObject[blog.author] =
      (authorLikesObject[blog.author] || 0) + blog.likes
    return authorLikesObject
  }, {})

  const maxLikes = Math.max(...Object.values(authorWithLikes))

  const authorWithMaxLikes = Object.keys(authorWithLikes).find(
    (author) => authorWithLikes[author] === maxLikes,
  )

  return {
    author: authorWithMaxLikes,
    likes: maxLikes,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  authorMostLikes,
}
