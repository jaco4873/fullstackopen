import { useState } from 'react'
import blogsService from '../services/blogs'

const Blog = ({ blog, onBlogAdded }) => {
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
    }
  }

  return (
    <>
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button style={hideWhenDetailsVisible} onClick={handleBlogDetailsVisible}>view</button> 
        <button style={showWhenDetailsVisible} onClick={handleBlogDetailsVisible}>hide</button> 
        <div style={showWhenDetailsVisible}>
          <p style={{ margin: 0 }} > URL: {blog.url}</p>
          <p style={{ margin: 0 }} > Likes: {blog.likes} <button onClick={handleLike} >like</button></p>
          <p style={{ margin: 0 }} > Added by: {blog.user.name}</p>
          <button style={{ backgroundColor: 'rgba(255, 0, 0, 0.7)', borderRadius: '5px', margin: 2 }} onClick={handleDelete} >remove</button> 
        </div>
      </div> 
    </>
    
  )
}

export default Blog