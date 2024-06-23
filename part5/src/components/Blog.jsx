import { useState } from 'react'
import blogsService from '../services/blogs'

const Blog = ({ blog, loggedInUser, onBlogAdded }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  // View/Hide Details functionality
  const [blogDetailsVisible, setBlogDetailsVisible] = useState(false)

  const handleBlogDetailsVisible = () => {
    setBlogDetailsVisible(!blogDetailsVisible)
  }

  const hideWhenDetailsVisible = { display: blogDetailsVisible ? 'none' : '' }
  const showWhenDetailsVisible = { display: blogDetailsVisible ? '' : 'none' }

  // Like functionality
  const handleLike = async (event) => {
    console.log('Like button clicked')
    event.preventDefault()

    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    console.log(updatedBlog)

    try {
      const response = await blogsService.like(updatedBlog)
      if (response.status === 200) {
        console.log('Blog updated successfully', updatedBlog)
        onBlogAdded() // Fetch blogs again to update UI with new like count
      } else {
        throw new Error(`Server responded with status: ${response.status}`)
      }
    } catch (error) {
      console.error('Failed to update blog', error)
    }
  }

  const handleDelete = async (event) => {
    console.log('Delete button clicked')
    event.preventDefault()

    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        const response = await blogsService.remove(blog)
        if (response.status === 204) {
          console.log('Blog deleted successfully', blog)
          onBlogAdded() // Fetch blogs again to update UI with new like count
        }
      } else {
        console.log('Deletetion cancelled')
      }
    } catch (error) {
      console.error('Failed to delete blog', error)
    }
  }

  return (
    <>
      <div style={blogStyle} className='blog' data-testid='blogPost'>
        {blog.title} {blog.author}
        <button style={hideWhenDetailsVisible} onClick={handleBlogDetailsVisible} data-testid='blogViewButton'>view</button>
        <button style={showWhenDetailsVisible} onClick={handleBlogDetailsVisible}>hide</button>
        <div className = 'details' style={showWhenDetailsVisible}>
          <p style={{ margin: 0 }} > URL: {blog.url}</p>
          <p style={{ margin: 0 }} data-testid='likeButton' > Likes: {blog.likes} <button onClick={handleLike} >like</button></p>
          <p style={{ margin: 0 }} > Added by: {blog.user.name}</p>
          {loggedInUser.username === blog.user.username && (
            <button 
              style={{ backgroundColor: 'rgba(255, 0, 0, 0.7)', borderRadius: '5px', margin: 2 }} 
              onClick={handleDelete} 
            >
              remove
            </button>
          )}
        </div>
      </div>
    </>

  )
}

export default Blog